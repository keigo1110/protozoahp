"use client"

import { useState, useEffect } from "react"
import Creature from "./creature"
import { creatures, type Creature as CreatureType } from "@/data/creatures"

type Position = {
  id: string
  x: number
  y: number
  radius: number
  scale: number
  rotation: number
}

type CreatureCanvasProps = {
  onInfoClick: (creature: CreatureType) => void
}

// 新しいアプローチ：グリッドベースの配置
function distributeCreaturesOnGrid(
  containerWidth: number,
  containerHeight: number,
  creatures: CreatureType[],
  marginX: number,
  marginY: number,
): Position[] {
  // 使用可能な領域
  const usableWidth = containerWidth - marginX * 2
  const usableHeight = containerHeight - marginY * 2

  // 配置する生物の平均サイズを計算
  const avgSize = creatures.reduce((sum, creature) => {
    return sum + Math.max(creature.width || 150, creature.height || 150)
  }, 0) / creatures.length

  // グリッドのセルサイズを計算（平均サイズを小さくして密に配置）
  const cellSize = avgSize * 0.8

  // グリッド次元の計算
  const gridColumns = Math.floor(usableWidth / cellSize)
  const gridRows = Math.floor(usableHeight / cellSize)

  // グリッドの総数を計算
  const totalCells = gridColumns * gridRows

  // 表示する最大生物数（グリッドのセル数を超えないようにする）
  const maxCreatures = Math.min(creatures.length, totalCells)

  // グリッドの配置を作成（各セルがすでに使用されているかを追跡）
  const grid: boolean[][] = Array(gridRows).fill(null).map(() => Array(gridColumns).fill(false))

  // 選択された生物の位置情報
  const positions: Position[] = []

  // 生物を配置
  for (let i = 0; i < maxCreatures; i++) {
    const creature = creatures[i]
    const radius = Math.max(creature.width || 150, creature.height || 150) / 2

    // まず規則的に配置を試みる（より均等な分布のため）
    let placed = false;

    // グリッドを走査する
    for (let row = 0; row < gridRows && !placed; row++) {
      for (let col = 0; col < gridColumns && !placed; col++) {
        if (!grid[row][col]) {
          // セルを占有
          grid[row][col] = true;

          // 生物の位置情報を計算（セルの中心に配置）
          const x = marginX + (col + 0.5) * cellSize;
          const y = marginY + (row + 0.5) * cellSize;

          // スケールと回転をランダムに設定（より小さく）
          const scale = Math.random() * 0.2 + 0.5; // 0.5〜0.7の範囲に縮小
          const rotation = Math.random() * 30 - 15; // -15〜15度

          // 位置情報を追加
          positions.push({
            id: creature.id,
            x,
            y,
            radius,
            scale,
            rotation
          });

          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    // 規則的配置で配置できなかった場合はランダム配置を試みる（バックアップ）
    if (!placed) {
      let attempts = 0;
      const maxAttempts = totalCells; // 試行回数を調整

      while (!placed && attempts < maxAttempts) {
        attempts++;

        // ランダムなセル位置を選択
        const row = Math.floor(Math.random() * gridRows);
        const col = Math.floor(Math.random() * gridColumns);

        // セルが空いているか確認
        if (!grid[row][col]) {
          // セルを占有
          grid[row][col] = true;

          // 生物の位置情報を計算（セルの中心に配置）
          const x = marginX + (col + 0.5) * cellSize;
          const y = marginY + (row + 0.5) * cellSize;

          // スケールと回転をランダムに設定（より小さく）
          const scale = Math.random() * 0.2 + 0.5; // 0.5〜0.7の範囲に縮小
          const rotation = Math.random() * 30 - 15; // -15〜15度

          // 位置情報を追加
          positions.push({
            id: creature.id,
            x,
            y,
            radius,
            scale,
            rotation
          });

          placed = true;
        }
      }
    }

    // 配置できなかった場合は警告
    if (!placed) {
      console.warn(`Could not place creature ${creature.id} after maximum attempts`);
    }
  }

  return positions
}

export default function CreatureCanvas({ onInfoClick }: CreatureCanvasProps) {
  const [positions, setPositions] = useState<Position[]>([])
  const [isPositioningComplete, setIsPositioningComplete] = useState(false)

  // 画面サイズに応じて生物の位置を計算
  useEffect(() => {
    const calculatePositions = () => {
      // コンテナのサイズを取得
      const containerElement = document.getElementById('creature-container')
      if (!containerElement) {
        return
      }

      const containerRect = containerElement.getBoundingClientRect()
      const containerWidth = containerRect.width
      const containerHeight = containerRect.height

      // 画面の余白を設定
      const marginX = containerWidth * 0.05  // 余白を小さくして表示領域を拡大
      const marginY = containerHeight * 0.05

      // すべての生物を表示する
      const allCreatures = [...creatures]

      // 生物のグリッドベースの位置を計算
      const newPositions = distributeCreaturesOnGrid(
        containerWidth,
        containerHeight,
        allCreatures,
        marginX,
        marginY
      )

      // 位置情報を設定
      setPositions(newPositions)
      setIsPositioningComplete(true)
    }

    // コンポーネントがマウントされた後に一度計算
    const timer = setTimeout(calculatePositions, 100)

    // リサイズ時に位置を再計算
    window.addEventListener("resize", calculatePositions)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculatePositions)
    }
  }, [])

  return (
    <div id="creature-container" className="relative w-full h-full">
      {isPositioningComplete &&
        positions.map((position) => {
          const creature = creatures.find((c) => c.id === position.id)
          if (!creature) return null

          return (
            <Creature
              key={creature.id}
              creature={creature}
              position={position}
              onInfoClick={() => onInfoClick(creature)}
            />
          )
        })}
    </div>
  )
}
