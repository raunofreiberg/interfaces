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
        <link
          rel="preload"
          href="/X-Regular.woff2"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/X-Medium.woff2"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
