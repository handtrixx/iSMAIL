import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import "./ui/styles/helpers.css";
import "./ui/styles/global.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: "iSMAIL - Next Generation imapsync",
  description: "Next Generation imapsync",
  generator: "texteditor",
  applicationName: "iSMAIL",
  referrer: "origin-when-cross-origin",
  keywords: ["imapsync", "imap", "mail", "backup"],
  authors: [{ name: "handtrixxx", url: "https://niklas-stephan.de" }],
  creator: "Niklas Stephan",
  publisher: "handtrixx",
  openGraph: {
    title: "iSMAIL - Next Generation imapsync",
    description: "Next Generation imapsync",
    url: "https://niklas-stephan.de",
    siteName: "iSMAIL",
    images: [
      {
        url: "https://cdfox.bbraun.io/assets/img/bfox.webp",
        width: 644,
        height: 480,
        alt: "CDFox",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/img/bfox.webp",
    shortcut: "/assets/img/bfox.webp",
    apple: "/assets/img/bfox.webp",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/img/bfox.webp",
    },
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data-theme" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
