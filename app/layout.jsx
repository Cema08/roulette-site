export const metadata = {
  title: "Roulette",
  description: "Spin the wheel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}