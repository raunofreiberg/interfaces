import "./globals.scss";

export const metadata = {
  title: "Web Interface Guidelines",
  description:
    "A non-exhaustive list of details that make a good web interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
