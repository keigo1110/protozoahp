import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Protozoa - エネルギー工作',
  description: 'スーパーキャパシタとアクチュエータを組み合わせた原生機械生物を体験するインタラクティブアート作品。手で触れることでエネルギーが供給され、様々な動きを見せる機械生物が誕生します。ProtoPedia Award 2025応募作品。',
  keywords: ['原生機械生物', 'プロトゾア', 'Protozoa', 'スーパーキャパシタ', 'アクチュエータ', 'インタラクティブアート', 'メディアアート', 'デジタルアート', '4ZIGEN', 'ProtoPedia', 'カンブリア紀', '機械生物', 'エネルギー工作'],
  authors: [
    { name: '南田桂吾' },
    { name: '中田裕紀' },
    { name: '金澤政宜' }
  ],
  creator: '4ZIGEN',
  publisher: '4ZIGEN',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://protozoa-site.vercel.app/',
    title: 'Protozoa - エネルギー工作',
    description: 'スーパーキャパシタとアクチュエータを組み合わせた原生機械生物を工作するインタラクティブアート作品。手で触れることでエネルギーが供給され、様々な動きを見せる機械生物が誕生します。',
    images: [
      {
        url: 'https://protozoa-site.vercel.app/images/ogp.png',
        width: 1200,
        height: 630,
        alt: 'Protozoa - 原生機械生物インタラクティブアート',
      },
    ],
    siteName: 'Protozoa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protozoa - エネルギー工作',
    description: 'スーパーキャパシタとアクチュエータを組み合わせた原生機械生物を工作するインタラクティブアート作品',
    images: ['https://protozoa-site.vercel.app/images/ogp.png'],
  },
  alternates: {
    canonical: 'https://protozoa-site.vercel.app/',
  },
  category: 'Interactive Art',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
