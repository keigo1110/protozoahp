"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import CreatureCanvas from "@/components/creature-canvas"
import InfoPanel from "@/components/info-panel"
import type { Creature } from "@/data/creatures"

// 粒子のスタイルを定義するインターフェース
interface ParticleStyle {
  top: string;
  left: string;
  opacity: number;
  animation: string;
}

export default function Home() {
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([])
  const [randomizedCreators, setRandomizedCreators] = useState<Array<{id: number, name: string, role: string, website?: string}>>([])

  // クライアントサイドでのみ粒子スタイルを生成
  useEffect(() => {
    const styles = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.3,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
    }));
    setParticleStyles(styles);

    // 制作者リストをシャッフル
    const creators = [
      { id: 1, name: "南田桂吾", role: "hogehoge", website: "https://keigominamida.com/" },
      { id: 2, name: "中田裕紀", role: "fugafuga", website: "https://yuki-nakata.org/" },
      { id: 3, name: "金澤政宜", role: "piyopiyo", website: "https://kanassi.info/" }
    ];

    // Fisher-Yatesシャッフルアルゴリズムを使用
    const shuffledCreators = [...creators];
    for (let i = shuffledCreators.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCreators[i], shuffledCreators[j]] = [shuffledCreators[j], shuffledCreators[i]];
    }

    setRandomizedCreators(shuffledCreators);
  }, [])

  // 情報パネルを表示する
  const handleInfoClick = (creature: Creature) => {
    setSelectedCreature(creature)
    setShowInfo(true)
  }

  // 情報パネルを閉じる
  const handleCloseInfo = () => {
    setShowInfo(false)
  }

  return (
    <div className="bg-gradient-to-b from-blue-950 to-blue-900 min-h-screen">
      {/* 背景の粒子効果 - カンブリア紀の海底環境をイメージ */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        {/* 漂う微生物や浮遊物をイメージした粒子 */}
        {particleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-200 rounded-full"
            style={style}
          />
        ))}

        {/* 海底の岩石や地層をイメージした装飾要素 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-16 bg-blue-800/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 right-0 w-2/5 h-20 bg-blue-800/20 rounded-tl-3xl"></div>

        {/* 海中の光の筋をイメージした要素 */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-200/10 to-transparent transform -rotate-6"></div>
        <div className="absolute top-0 right-1/3 w-2 h-full bg-gradient-to-b from-blue-200/5 to-transparent transform rotate-12"></div>
      </div>

      {/* 背景 - カンブリア紀の深海環境 */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 via-gray-900/90 to-blue-950/70"></div>

        {/* 地層や古代の岩肌を表現する装飾要素 */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23aaaacc' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}>
        </div>
      </div>

      {/* メインコンテンツ - スクロールできるようにする */}
      <main className="relative z-0">
        {/* ヘッダー */}
        <header className="pt-10 pb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-100 tracking-wider">Protozoa</h1>
          <p className="text-blue-200 mt-2 opacity-80 max-w-lg mx-auto">
            <span className="text-sm opacity-70 mt-2 inline-block">
              （短いタップ：小さく動く、長いタップ：大きく動く）
            </span>
          </p>
        </header>

        {/* 生物キャンバス - 固定高さで配置 */}
        <section className="relative w-full h-[60vh] mx-auto mb-8">
          <div className="w-full h-full">
            <CreatureCanvas onInfoClick={handleInfoClick} />
          </div>
        </section>

        {/* コンセプトセクション */}
        <section className="w-full py-12 bg-gradient-to-b from-gray-900/30 to-blue-950/30 border-t border-b border-blue-800/50 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-blue-100 px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">コンセプト</h2>
            <p className="mb-8 text-lg md:text-xl">
            スーパーキャパシタを生命の「種」と捉え、<br />
            電源を取り付けた手の接触によってエネルギを供給することで、<br />
            多様な「原生機械生物」が誕生するインタラクティブアートです。<br />
            様々な形態と動きを持つ原始的な機械生物群が、「タッチ」によって動き出します。<br />
            ほんのわずかな接触でエネルギが注がれ、機械生物は生命を宿したかのように動き始めます。<br />
            床をゆっくりと這うもの、リズミカルに脈動するもの、<br />
            予測不能な軌道で転がり続けるもの、軽やかに空間を舞うもの、<br />
            水面を優雅に滑走するものなど、一つ一つの接触が、<br />
            異なる個性と動きを持つ原始的な生命の誕生の瞬間となります。<br />
            蓄えられたエネルギが尽きると活動を停止し、<br />
            再びの接触することによってまた新たに動き出します。
            </p>
          </div>
        </section>

        {/* 動画セクション */}
        <section id="video-section" className="w-full py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-100 text-center">動画</h2>
            <div className="aspect-video w-full bg-gray-700 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // あとで実際の動画URLに置き換えてください
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* 制作者セクション */}
        <section id="creators-section" className="w-full py-12 bg-gradient-to-b from-blue-950/30 to-gray-900/30 border-t border-blue-800/50 relative z-10">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-100 mb-8">制作者</h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {randomizedCreators.map((creator) => (
                <a
                  key={creator.id}
                  href={creator.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-xs sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] transform transition-transform hover:scale-105"
                >
                  <div className="bg-blue-800/50 hover:bg-blue-700/70 p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
                    <p className="text-lg font-medium text-blue-50">{creator.name}</p>
                    <p className="text-sm text-blue-200 mt-1">{creator.role}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="w-full py-8 text-center text-blue-300 text-sm opacity-70">
          © {new Date().getFullYear()} Protozoa
        </footer>
      </main>

      {/* 情報パネル */}
      <AnimatePresence>
        {showInfo && selectedCreature && <InfoPanel creature={selectedCreature} onClose={handleCloseInfo} />}
      </AnimatePresence>
    </div>
  )
}
