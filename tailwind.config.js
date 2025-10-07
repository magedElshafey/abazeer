/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
	darkMode: ["class", "class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				din: [
					'DINNextLTArabic',
					'sans-serif'
				]
			},
			colors: {
				background: {
					DEFAULT: "hsl(var(--background))",
					light: "#ffffff",
					dark: "#0f172a",
					babyBlue: "#F0EDFFCC",
					gray: "#f7f7f7",
					green: "#26901b",
				},
				text: {
					light: "#1e293b",
					dark: "#f8fafc",
					gray: "#828282",
					red: "#FF0000",
					subHeader: "#8593A3",
					link: "#09c",
					darkRed: "#cb4321",
				},
				darkBlue: "#0642BC",
				lightBlue: "#3274FF",
				orangeColor: "#fab528",
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [typography, require("tailwindcss-animate")],
};
