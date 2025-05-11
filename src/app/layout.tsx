import "~/styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "YuYing - Portfolio",
  description: "yuying liang's software developer portfolio",
  icons: [{ rel: "icon", url: "/logo.png" }],
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
