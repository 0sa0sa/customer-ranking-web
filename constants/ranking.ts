export const RANKING = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
} as const;

export type TRanking = (typeof RANKING)[keyof typeof RANKING];

export const RANKING_STRING = {
  CUSTOMER: "現在の購入金額",
  BRONZE: "ブロンズ",
  SILVER: "シルバー",
  GOLD: "ゴールド",
} as const;

export type TRankingInfo = {
  currentRankingColor: TRanking;
  downGradDate: string;
  firstOrderDate: string | null;
  nextRanking: TRanking;
  restPaymentForNextRanking: number | null;
  restPaymentToKeepRanking: number;
  thisYearPayment: number;
};
