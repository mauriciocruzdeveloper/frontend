import "./globals.css";
import { ReduxProvider } from "@/store/store-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ReduxProvider>
  );
}
