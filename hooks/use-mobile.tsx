"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初期チェック
    checkMobile()

    // リサイズイベントのリスナー
    window.addEventListener("resize", checkMobile)

    // クリーンアップ
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
