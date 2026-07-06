import "./globals.css";

export const metadata = {
  title: "Mister Glass | Windshield, Auto & Home Glass Repair",
  description:
    "Mobile windshield repair, auto glass replacement, and home glass repair estimates from Mister Glass.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
