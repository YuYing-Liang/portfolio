import { Providers } from "../providers";

export const metadata = {
  title: "Virtual Bookself",
  description: "create your own virtual bookshelf",
  icons: [{ rel: "icon", url: "/logo-bookshelf.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
