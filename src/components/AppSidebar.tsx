
import { useState } from "react";
import { Home, FileText, Phone, Settings, LogOut, Building2, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { title: "ダッシュボード", url: "/dashboard", icon: Home },
  { title: "案件管理", url: "/cases", icon: FileText },
  { title: "通話履歴", url: "/calls", icon: Phone },
  { title: "設定", url: "/settings", icon: Settings },
];

const recentCases = [
  { id: "1", company: "株式会社サンプル", status: "completed" },
  { id: "2", company: "テスト商事株式会社", status: "in_progress" },
  { id: "3", company: "例示会社Ltd.", status: "draft" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'draft':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-primary">FUKIFUKI</h2>
              <p className="text-xs text-muted-foreground">退職代行サービス</p>
            </div>
          </div>
        )}
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>最近の案件</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentCases.map((case_) => (
                  <SidebarMenuItem key={case_.id}>
                    <SidebarMenuButton asChild>
                      <NavLink to={`/call/${case_.id}`} className="hover:bg-accent hover:text-accent-foreground">
                        <Building2 className="h-4 w-4" />
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate text-sm">{case_.company}</span>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(case_.status)}`} />
                        </div>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium">山田太郎</p>
                <p className="text-muted-foreground text-xs">yamada@example.com</p>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="p-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
