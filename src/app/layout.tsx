import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What's in the Fridge?",
  description:
    "Get delicious recipes based on ingredients you have at home. Reduce food waste and discover new meal ideas with AI-powered recipe suggestions.",
  icons: {
    icon: [{ url: "/Untitled.png", type: "image/png" }],
    shortcut: "/Untitled.png",
    apple: "/Untitled.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Fredoka:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
