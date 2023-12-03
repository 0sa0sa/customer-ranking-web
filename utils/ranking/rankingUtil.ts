import { RANKING, TRanking } from "../../constants/ranking";

export const getRankingEmoji = (ranking: TRanking | null) => {
  switch (ranking) {
    case "BRONZE":
      return "🥉";
    case "SILVER":
      return "🥈";
    case "GOLD":
      return "🥇";
    default:
      return null;
  }
};

export const getNextRanking = (ranking: TRanking): TRanking | null => {
  switch (ranking) {
    case "BRONZE":
      return "SILVER";
    case "SILVER":
      return "GOLD";
    case "GOLD":
      return null;
    default:
      return null;
  }
};

export const getRankingBarStyle = (
  color: TRanking | "CUSTOMER",
  totalWidth: number,
  totalPayment: number,
  currentRanking?: TRanking
) => {
  return {
    position: "absolute",
    height: "15px",
    width: `${getRankingBarWidth(color, totalWidth, totalPayment)}px`,
    backgroundColor: getRankingBarColor(color),
    opacity: color === "CUSTOMER" ? 1 : color === currentRanking ? 0.7 : 0.4,
    zIndex: getRankingBarZIndex(color),
    borderRadius: "8px",
    border: "1px solid black",
  } as const;
};

export const getRankingBarColor = (color: TRanking | "CUSTOMER") => {
  switch (color) {
    case "CUSTOMER":
      return "blue";
    case RANKING.BRONZE:
      return "brown";
    case RANKING.SILVER:
      return "silver";
    case RANKING.GOLD:
      return "gold";
  }
};

export const getRankingBarZIndex = (color: TRanking | "CUSTOMER") => {
  switch (color) {
    case "CUSTOMER":
      return 10;
    case RANKING.BRONZE:
      return 2;
    case RANKING.SILVER:
      return 1;
    case RANKING.GOLD:
      return 0;
  }
};

export const getRankingBarWidth = (
  color: TRanking | "CUSTOMER",
  totalWidth: number,
  totalPayment: number
) => {
  // NOTE: 表示する金額は0~800までとする
  const customerWidth =
    totalPayment === 0 ? 0 : totalWidth * (totalPayment / 800);

  const goldWidth = totalWidth;
  const silverWidth = totalWidth * (5 / 8);
  const bronzeWidth = totalWidth * (1 / 8);
  switch (color) {
    case "CUSTOMER":
      return customerWidth;
    case RANKING.BRONZE:
      return bronzeWidth;
    case RANKING.SILVER:
      return silverWidth;
    case RANKING.GOLD:
      return goldWidth;
  }
};
