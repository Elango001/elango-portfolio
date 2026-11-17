import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Elangovan S | AI & Backend Engineer",
  description:
    "AI & Backend Engineer specializing in scalable FastAPI/Flask architectures, LangGraph multi-agent orchestration, and production PyTorch machine learning pipelines.",
  keywords: [
    "Elangovan S",
    "AI Engineer",
    "Backend Engineer",
    "FastAPI",
    "PyTorch",
    "LangGraph",
    "Flask",
    "Three.js",
    "System Design",
    "Machine Learning",
  ],
  authors: [{ name: "Elangovan S", url: "https://github.com/Elango001" }],
  openGraph: {
    title: "Elangovan S | AI & Backend Engineer",
    description:
      "Scalable backend architectures, autonomous multi-agent loops, and deep learning engineering.",
    url: "https://github.com/Elango001",
    siteName: "Elangovan S Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('nk_portfolio_theme_v1');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
