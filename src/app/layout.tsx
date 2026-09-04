import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400","500","600","700","800"],
	variable: "--font-inter",
	display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400","500","600","700"],
	variable: "--font-jetbrains",
	display: "swap"
});

export const metadata: Metadata = {
	title: "Subledger — billing backend for the Obtuse Labs portfolio",
	description: "Plans, customers, subscriptions and invoices, backed by idempotent payment recording and an append-only ledger. A REST API that records money movement — it never touches the money itself.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(
							function(){
								try {
									var t=localStorage.getItem('subledger-theme');
									if(t!=='light'&&t!=='dark')
										t='dark';
									document.documentElement.dataset.theme=t;
								}
								catch(e) {
									document.documentElement.dataset.theme='dark';
								}
							}
						)();`,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col bg-bg text-fg font-sans">
				<Analytics />
				<ThemeProvider>
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
