import "../app/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Ceylon Essence</title>
        <meta name="description" content="Premium Sri Lankan spices and handcrafts" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
