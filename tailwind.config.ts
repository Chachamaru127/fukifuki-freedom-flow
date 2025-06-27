
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0066CC',
					50: '#E6F2FF',
					100: '#CCE5FF',
					200: '#99CCFF',
					300: '#66B2FF',
					400: '#3399FF',
					500: '#0066CC',
					600: '#0052A3',
					700: '#003D7A',
					800: '#002952',
					900: '#001429',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#FFB703',
					50: '#FFF8E1',
					100: '#FFECB3',
					200: '#FFE082',
					300: '#FFD54F',
					400: '#FFCA28',
					500: '#FFB703',
					600: '#FFA000',
					700: '#FF8F00',
					800: '#FF6F00',
					900: '#E65100',
					foreground: '#202225'
				},
				neutral: {
					DEFAULT: '#F4F6F8',
					50: '#FAFBFC',
					100: '#F4F6F8',
					200: '#E4E6EA',
					300: '#D4D6DA',
					400: '#9AA0A6',
					500: '#5F6368',
					600: '#3C4043',
					700: '#202225',
					800: '#171717',
					900: '#0D0D0D',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: '8px',
				md: '6px',
				sm: '4px'
			},
			fontFamily: {
				heading: ['"M PLUS 1p"', 'sans-serif'],
				body: ['"Noto Sans JP"', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 150ms ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
