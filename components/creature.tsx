"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Info } from "lucide-react"
import type { Creature as CreatureType } from "@/data/creatures"

type Position = {
  x: number
  y: number
  scale: number
  rotation: number
}

type CreatureProps = {
  creature: CreatureType
  position: Position
  onInfoClick: () => void
}

// 生物のカテゴリに応じたアニメーションを定義
const categoryAnimations = {
  land: {
    // 陸の生物：うごめく・多関節的な動き（より多様に）
    tap: (duration: number, intensity: number) => ({
      x: [0, 60 * intensity, -80 * intensity, 40 * intensity, -50 * intensity, 70 * intensity, -45 * intensity, 30 * intensity, -20 * intensity, 10 * intensity, 0],
      y: [0, -40 * intensity, 30 * intensity, -55 * intensity, 65 * intensity, -35 * intensity, 25 * intensity, -15 * intensity, 10 * intensity, -5 * intensity, 0],
      rotate: [0, 25 * intensity, -20 * intensity, 30 * intensity, -25 * intensity, 15 * intensity, -10 * intensity, 5 * intensity, -3 * intensity, 1 * intensity, 0],
      scale: [1, 1 + 0.08 * intensity, 1 - 0.1 * intensity, 1 + 0.05 * intensity, 1 - 0.03 * intensity, 1 + 0.06 * intensity, 1 - 0.04 * intensity, 1 + 0.02 * intensity, 1 - 0.01 * intensity, 1 + 0.01 * intensity, 1],
      transition: {
        duration: duration,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    }),
  },
  air: {
    // 空の生物：ふわふわと漂う動き（より上昇・広範囲）
    tap: (duration: number, intensity: number) => ({
      y: [0, -140 * intensity, -60 * intensity, -180 * intensity, -100 * intensity, -150 * intensity, -80 * intensity, -120 * intensity, -50 * intensity, -30 * intensity, 0],
      x: [0, 20 * intensity, -15 * intensity, 40 * intensity, -30 * intensity, 60 * intensity, -45 * intensity, 25 * intensity, -10 * intensity, 5 * intensity, 0],
      rotate: [0, 10 * intensity, -8 * intensity, 15 * intensity, -12 * intensity, 8 * intensity, -5 * intensity, 3 * intensity, -2 * intensity, 1 * intensity, 0],
      scale: [1, 1 + 0.1 * intensity, 1 + 0.05 * intensity, 1 + 0.12 * intensity, 1 + 0.07 * intensity, 1 + 0.09 * intensity, 1 + 0.04 * intensity, 1 + 0.03 * intensity, 1 + 0.02 * intensity, 1 + 0.01 * intensity, 1],
      transition: {
        duration: duration,
        ease: [0.34, 1.56, 0.64, 1], // 風に漂うような動き
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    }),
  },
  water: {
    // 水の生物：波打つような滑らかな動き（より遠くへ）
    tap: (duration: number, intensity: number) => ({
      x: [
        0,
        100 * intensity,
        150 * intensity,
        120 * intensity,
        80 * intensity,
        0 * intensity,
        -80 * intensity,
        -150 * intensity,
        -120 * intensity,
        -50 * intensity,
        -20 * intensity,
        0,
      ],
      y: [0, 8 * intensity, 3 * intensity, -5 * intensity, -10 * intensity, -3 * intensity, 0, 5 * intensity, 10 * intensity, 3 * intensity, -2 * intensity, 0],
      rotate: [
        0,
        12 * intensity,
        18 * intensity,
        15 * intensity,
        8 * intensity,
        0,
        -8 * intensity,
        -15 * intensity,
        -12 * intensity,
        -5 * intensity,
        -2 * intensity,
        0,
      ],
      scale: [1, 1 + 0.05 * intensity, 1 + 0.08 * intensity, 1 + 0.04 * intensity, 1 + 0.02 * intensity, 1, 1 - 0.02 * intensity, 1 + 0.03 * intensity, 1 + 0.05 * intensity, 1 + 0.02 * intensity, 1 - 0.01 * intensity, 1],
      transition: {
        duration: duration,
        ease: [0.45, 0, 0.55, 1], // 滑らかな波打つような動き
        times: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.86, 1],
      },
    }),
  },
}

export default function Creature({ creature, position, onInfoClick }: CreatureProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showInfoButton, setShowInfoButton] = useState(false)
  const tapStartTimeRef = useRef<number | null>(null)
  const [animationDuration, setAnimationDuration] = useState(2)
  const [animationIntensity, setAnimationIntensity] = useState(1)

  // タップ開始時の処理
  const handleTapStart = () => {
    tapStartTimeRef.current = new Date().getTime()
  }

  // タップ終了時の処理
  const handleTap = () => {
    if (isAnimating) return

    const tapEndTime = new Date().getTime()
    const tapDuration = tapStartTimeRef.current ? (tapEndTime - tapStartTimeRef.current) / 1000 : 0

    // タップ時間に応じてアニメーション時間と強度を決定
    let duration = 0
    let intensity = 0

    if (tapDuration < 0.2) {
      // 短いタップ：3秒間動く、強度1.0
      duration = 3
      intensity = 1.0
    } else if (tapDuration < 0.7) {
      // 中くらいのタップ：5秒間動く、強度1.5
      duration = 5
      intensity = 1.5
    } else {
      // 長いタップ：7秒間動く、強度2.0
      duration = 7
      intensity = 2.0
    }

    // 生物の種類に応じてさらにランダム性を追加
    const categoryFactor = {
      land: { durationMod: 0.9, intensityMod: 1.2 },
      air: { durationMod: 1.2, intensityMod: 0.9 },
      water: { durationMod: 1.1, intensityMod: 1.1 }
    }[creature.category]

    // カテゴリごとの特性と少しのランダム性を追加
    duration *= categoryFactor.durationMod * (0.9 + Math.random() * 0.4) // ±20%のランダム性
    intensity *= categoryFactor.intensityMod * (0.9 + Math.random() * 0.3) // ±15%のランダム性

    setAnimationDuration(duration)
    setAnimationIntensity(intensity)
    setIsAnimating(true)

    // アニメーション終了後に状態をリセット
    setTimeout(() => {
      setIsAnimating(false)
    }, duration * 1000)
  }

  // 情報ボタンクリック時の処理
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation() // タップイベントの伝播を止める
    onInfoClick()
  }

  // タッチデバイスかどうかを検出
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // タッチデバイスかどうかを検出
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isAnimating ? 20 : 10,
        transform: `translate(-50%, -50%)`,  // 中心を基準に配置
        willChange: "transform",  // パフォーマンス最適化
      }}
      animate={
        isAnimating
          ? categoryAnimations[creature.category].tap(animationDuration, animationIntensity)
          : {
              opacity: 1,
              scale: position.scale,
              rotate: position.rotation,
            }
      }
      whileHover={{ scale: position.scale * 1.1, transition: { duration: 0.2 } }}
      onTapStart={handleTapStart}
      onTap={handleTap}
      onHoverStart={() => setShowInfoButton(true)}
      onHoverEnd={() => !isTouchDevice && setShowInfoButton(false)}
    >
      <div className="relative">
        <Image
          src={creature.image || "/placeholder.svg"}
          alt={creature.name}
          width={creature.width || 150}
          height={creature.height || 150}
          className="pointer-events-none select-none"
          priority={true}
          unoptimized={creature.image.includes("placeholder")}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* 情報ボタン */}
        <AnimatePresence>
          {(showInfoButton || isTouchDevice) && (
            <motion.div
              className={`absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 cursor-pointer hover:bg-blue-400 ${isTouchDevice ? 'info-button-touch' : ''}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isTouchDevice ? 0.7 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={handleInfoClick}
            >
              <Info size={isTouchDevice ? 20 : 16} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
