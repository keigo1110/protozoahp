"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { Creature } from "@/data/creatures"

type InfoPanelProps = {
  creature: Creature
  onClose: () => void
}

export default function InfoPanel({ creature, onClose }: InfoPanelProps) {
  // カテゴリに応じた色を設定
  const categoryColors = {
    land: "bg-green-900",
    air: "bg-sky-900",
    water: "bg-blue-900",
  }

  const categoryNames = {
    land: "陸生種",
    air: "空中種",
    water: "水生種",
  }

  const categoryDescriptions = {
    land: "太古の海底で進化した多様な形態を持つ節足動物群。硬質外殻と多関節肢を特徴とし、後の三葉虫や甲殻類の祖先とされる。第三次大量絶滅後、その多くは化石記録から姿を消した。",
    air: "海水の塩分濃度変化に適応し気泡構造を進化させた浮遊性生物群。薄い膜状器官で風を捉える能力を持ち、後の飛翔生物に影響を与えたという仮説がある。カンブリア中期の「大気への挑戦」事象の証拠とされる。",
    water: "古代海洋を優雅に泳いだ知性の先駆者たち。流線型の体と発達した感覚器官により効率的な捕食を行った。我々脊椎動物の遠い祖先を含むとされ、神経索の原始的痕跡が一部の化石から発見されている。",
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-md mx-4 bg-gray-900 rounded-lg overflow-hidden shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className={`p-4 ${categoryColors[creature.category]}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{creature.name}</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="mt-1 text-sm text-white/70">{categoryNames[creature.category]} / カンブリア紀中期</div>
        </div>

        {/* 本文 */}
        <div className="p-4 bg-gray-800 text-gray-200">
          <div className="flex justify-center mb-4">
            <div className="relative w-56 h-56 flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
              <img
                src={creature.image || "/placeholder.svg"}
                alt={creature.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">形態と特性</h3>
              <p className="text-gray-300">{creature.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-700">
              <h3 className="text-lg font-medium text-white mb-2">進化論的知見</h3>
              <p className="text-gray-300 text-sm">{categoryDescriptions[creature.category]}</p>
            </div>

            {creature.details && (
              <div className="pt-3 border-t border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">分類データ</h3>
                <ul className="space-y-2 text-sm">
                  {Object.entries(creature.details).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="w-24 text-gray-400">{key}:</span>
                      <span className="text-gray-200">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-400 italic">
                ※ 本記録は「カンブリア古生物研究機構」による第37次発掘調査に基づく推測復元です。実際の形態や生態は判明していない部分も多く、今後の発見により変更される可能性があります。
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
