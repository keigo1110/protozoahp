import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Protozoa',
  description: 'Protozoa',
  generator: 'Protozoa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <title>Protozoa - 原生機械生物を体験するインタラクティブアート</title>
        <meta name="description" content="スーパーキャパシタとアクチュエータを組み合わせた原生機械生物を体験するインタラクティブアート作品のウェブサイトです。" />
        <meta name="keywords" content="原生機械生物, プロトゾア, Protozoa, スーパーキャパシタ, アクチュエータ, インタラクティブアート, メディアアート, デジタルアート, 4ZIGEN" />
        <meta property="og:title" content="Protozoa - 原生機械生物を体験するインタラクティブアート" />
        <meta property="og:description" content="スーパーキャパシタとアクチュエータを組み合わせた原生機械生物を体験するインタラクティブアート作品のウェブサイトです。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://protozoa-site.vercel.app/" />
        <meta property="og:image" content="https://protozoa-site.vercel.app/images/ogp.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://protozoa-site.vercel.app/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
