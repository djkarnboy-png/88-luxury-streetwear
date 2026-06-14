import "./globals.css";

export const metadata = {
  title: "8:8 | Beyond Limits",
  description:
    "A luxury streetwear universe built around infinity, evolution, symbolism, and exclusivity."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
