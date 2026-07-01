import "./globals.css";

export const metadata = {
  title: "DreamAndScale | Business Clarity Program",
  description:
    "DreamAndScale helps people understand how businesses work before they risk time, money, or career capital.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
