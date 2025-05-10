// 生物データの型定義
export type Creature = {
  id: string
  name: string
  category: "land" | "air" | "water"
  image: string
  description: string
  width?: number
  height?: number
  details?: Record<string, string>
}

// 生物データ
export const creatures: Creature[] = [
  // 陸の生物
  {
    id: "land-1",
    name: "アノマロカリス",
    category: "land",
    image: "/images/car.png?height=150&width=200",
    width: 200,
    height: 150,
    description: "強靭な捕食肢と複合眼による高度な視覚を持つ原始節足類。口部は円形の歯板で構成され、堅い外骨格を持つ獲物さえも粉砕可能。柔軟な体節構造により俊敏な遊泳能力を有し、カンブリア紀の海洋生態系の頂点捕食者として機能した。推定寿命は7〜10年で、成体は100cmを超える個体も確認されている。",
    details: {
      発見地点: "北米バージェス頁岩",
      発見年: "1911年",
      学名: "Anomalocaris canadensis",
      推定寿命: "7-10年",
      捕食能力: "S+ランク",
      知性指数: "海洋生物中上位",
    },
  },
  {
    id: "land-2",
    name: "バイオマン",
    category: "land",
    image: "/images/big.png?height=150&width=200",
    width: 200,
    height: 150,
    description: "独自の細胞共生機構を発達させた複合生態系生物。体表を覆う半透明の生体膜は、周囲の化学物質を直接取り込み、内部の微小生態系へと転送する。外部環境の変化に迅速に適応する分散型の神経構造を持ち、擬態能力と環境同化能力に優れる。比較的遅い移動速度だが、環境適応性の高さから広範な生態系に進出した。",
    details: {
      発見地点: "チェコ・コウタ頁岩層",
      発見年: "1997年",
      学名: "Biomanis synergeticus",
      寿命: "不明（休眠可）",
      環境適応指数: "94%（最高級）",
      行動様式: "半植物性・集合知性",
    },
  },

  // 空の生物
  {
    id: "air-1",
    name: "エアロフィス",
    category: "air",
    image: "/images/fly.png?height=140&width=180",
    width: 180,
    height: 140,
    description: "推進力は、露出した電動機と、それに直結された簡素な回転翼が生み出す推力のみに依存する。他のいかなる冗長な飛行補助システムも搭載されていない。その設計思想は、あたかも太古の機械文明において、もし生命形態が飛行能力を最初に獲得しようとしたならば、という思考実験から生まれた原初的形態を彷彿とさせる。カンブリア紀の生物が海洋ではなく大気への適応を試みたという仮説を、純粋な機械工学の観点から再解釈したかのようだ。機体フレームは最低限の構造材で構成され、動力源であるモーターと推進力を司るプロペラが外部に剥き出しになっている。",
    details: {
      発見地点: "西部チェンジャン生物群",
      発見年: "2037年",
      学名: "Aerofisus primitiva",
      飛行高度: "海抜20-50m",
      生存確率: "極めて低い",
      特殊能力: "自己修復機構",
    },
  },

  // 水の生物
  {
    id: "water-1",
    name: "ピカイア",
    category: "water",
    image: "/images/wat.png?height=100&width=200",
    width: 200,
    height: 100,
    description: "脊索の原始的形態を持つ水生動物。側面筋肉の波状運動による効率的な推進メカニズムを進化させ、高速で持続的な遊泳を可能にした。体長は5cm程度だが、後の全脊椎動物の共通祖先として極めて重要な進化的位置を占める。頭部に形成された単純な感覚器官は、方向性のある運動能力の初期発達を示している。",
    details: {
      発見地点: "カナダ・ヨーホー国立公園",
      発見年: "1909年",
      学名: "Pikaia gracilens",
      体長: "5-8cm",
      移動速度: "毎秒3体長",
      遺伝的影響: "全脊椎動物に波及",
    },
  },
]
