import { IconRobotFace } from "@tabler/icons-react";
import { sans } from "../fonts";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-beige ${sans.className}`}>
        <main className="container mx-auto p-5">
          <nav className={`block flex w-auto flex-row-reverse`}>
            <ul className="flex flex-row items-center gap-x-7 font-medium">
              <li>
                <Link href="/portfolio">projects</Link>
              </li>
              <li>
                <Link href="/portfolio/blog">blog</Link>
              </li>
              <li>
                <Link href="/portfolio/about">
                  <IconRobotFace stroke={1.5} size={22} />
                </Link>
              </li>
            </ul>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
