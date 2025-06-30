
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { AccessToken } from "https://esm.sh/livekit-server-sdk@1.2.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StartCallRequest {
  case_id: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Set auth for supabase client
    supabase.auth.setSession({ access_token: authHeader.replace('Bearer ', ''), refresh_token: '' });

    const { case_id }: StartCallRequest = await req.json();

    if (!case_id) {
      return new Response(
        JSON.stringify({ error: 'case_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Starting call for case_id: ${case_id}`);

    // 案件情報を取得
    const { data: caseData, error: caseError } = await supabase
      .from('cases')
      .select('*')
      .eq('id', case_id)
      .single();

    if (caseError || !caseData) {
      console.error('Error fetching case:', caseError);
      return new Response(
        JSON.stringify({ error: 'Case not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found case: ${caseData.company_name} - ${caseData.employee_name}`);

    // LiveKit設定を取得
    const livekitApiKey = Deno.env.get('LIVEKIT_API_KEY');
    const livekitApiSecret = Deno.env.get('LIVEKIT_API_SECRET');
    const livekitWsUrl = Deno.env.get('LIVEKIT_WS_URL');

    if (!livekitApiKey || !livekitApiSecret || !livekitWsUrl) {
      console.error('Missing LiveKit configuration');
      return new Response(
        JSON.stringify({ error: 'LiveKit configuration not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // LiveKit roomを作成（room名は案件IDをベースにする）
    const roomName = `case-${case_id}`;
    const participantName = `agent-${caseData.employee_name || 'unknown'}`;

    console.log(`Creating LiveKit room: ${roomName} for participant: ${participantName}`);

    // AccessTokenを作成
    const accessToken = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: participantName,
      ttl: '1h', // 1時間有効
    });

    // Room権限を付与
    accessToken.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = accessToken.toJwt();

    console.log(`Generated token for room: ${roomName}`);

    // 通話開始ログを案件に記録（オプション）
    const { error: updateError } = await supabase
      .from('cases')
      .update({ 
        status: 'negotiating',
        updated_at: new Date().toISOString() 
      })
      .eq('id', case_id);

    if (updateError) {
      console.warn('Failed to update case status:', updateError);
    }

    // レスポンスを返す
    const response = {
      success: true,
      room_name: roomName,
      token: token,
      ws_url: livekitWsUrl,
      case_info: {
        id: caseData.id,
        company_name: caseData.company_name,
        employee_name: caseData.employee_name,
        status: caseData.status,
      },
      message: 'Call session created successfully'
    };

    console.log('Call session created successfully');

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error in start-call function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
