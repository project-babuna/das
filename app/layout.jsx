import "./globals.css";

export const metadata = {
  title: "DreamAndScale | Founder Thinking & Business Clarity",
  description:
    "DreamAndScale is EntreMento's flagship program for founder thinking and business clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
