import "./globals.scss";

const url = "https://interfaces.rauno.me";
const title = "Web Interface Guidelines";
const description =
  "A non-exhaustive list of details that make a good web interface.";
const ogUrl = `${url}/og.png`;

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [{ url: ogUrl }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogUrl],
  },
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
