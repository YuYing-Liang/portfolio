import "~/styles/globals.css";
import { mono, sans } from "./fonts";
import { MantineProvider } from "@mantine/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        primaryColor: "purple",
        colors: {
          purple: [
            "#EADDFB",
            "#CDBAF0",
            "#A894DB",
            "#9C85D6",
            "#8F75D1",
            "#8366CC",
            "#7657C7",
            "#6A47C2",
            "#603DB8",
            "#5838A8",
          ],
          pink: [
            "#F9F1F5",
            "#F2E3EB",
            "#ECD5E2",
            "#E3C0D3",
            "#DFB9CE",
            "#D8ABC4",
            "#D29DBA",
            "#CC8FB0",
            "#C581A7",
            "#BF739E",
          ],
          tan: [
            "#EFDFD2",
            "#E9D5C3",
            "#E4CAB4",
            "#DFC0A5",
            "#DAB596",
            "#D4AB87",
            "#CEA078",
            "#C99669",
            "#C48B5A",
            "#BE814B",
          ],
          beige: [
            "#EBE4D9",
            "#E3D9C4",
            "#DCCEAF",
            "#D4C39A",
            "#CCB885",
            "#C4AD70",
            "#BDA35B",
            "#B59A46",
            "#AD902F",
            "#A6841A",
          ],
          dark: [
            "#7E7777",
            "#746D6D",
            "#696363",
            "#605959",
            "#5F5959",
            "#544F4F",
            "#4A4545",
            "3F3B3B",
            "#353131",
            "##252323",
          ],
          light: [
            "#F5F5F5",
            "#E8E8E8",
            "#DBDBDB",
            "#CECECE",
            "#C1C1C1",
            "#B4B4B4",
            "#A7A7A7",
            "#9A9A9A",
            "#8D8D8D",
            "#808080",
          ],
        },
        fontFamily: sans.style.fontFamily,
        fontFamilyMonospace: mono.style.fontFamily,
        headings: {
          fontFamily: sans.style.fontFamily,
        },
        luminanceThreshold: 0.4,
      }}
    >
      {children}
    </MantineProvider>
  );
}
