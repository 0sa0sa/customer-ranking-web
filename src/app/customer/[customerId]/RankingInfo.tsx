import { h2Style } from "@/app/styles";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { Card } from "../../../../components/Card";
import { TCustomerInfo } from "../../../../constants/customerInfo";
import {
  RANKING,
  RANKING_STRING,
  TRanking,
  TRankingInfo,
} from "../../../../constants/ranking";
import {
  getNextRanking,
  getRankingBarColor,
  getRankingBarStyle,
  getRankingBarWidth,
  getRankingEmoji,
} from "../../../../utils/ranking/rankingUtil";

type Props = {
  customerInfo: TCustomerInfo | null;
  rankingInfo: TRankingInfo | null;
};

export const RankingInfo: FC<Props> = ({ customerInfo, rankingInfo }) => {
  const thisYear = dayjs().year();
  const lastYear = dayjs().subtract(1, "year").year();
  const rankingBarWidth = 500;
  const currentRanking = rankingInfo?.currentRankingColor;

  return (
    <>
      <h2 style={h2Style}>Ranking Info</h2>
      <Card restStyle={{ width: "800px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              ...cardContentStyle,
              width: "700px",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "auto",
            }}
          >
            {/* ===== ランキングバー ===== */}
            <RankingBar
              rankingBarWidth={rankingBarWidth}
              totalPayment={customerInfo?.total_payment_from_last_year ?? 0}
              currentRanking={currentRanking}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {/* ===== ランク ===== */}
              <div style={cardContentStyle}>
                <span>あなたのランク</span>
                <div style={{ fontSize: "80px" }}>
                  {getRankingEmoji(currentRanking ?? RANKING.BRONZE)}
                </div>
                <span>次のランク</span>
                <div style={{ fontSize: "20px" }}>
                  {getRankingEmoji(
                    getNextRanking(currentRanking ?? RANKING.BRONZE)
                  ) ?? "最高ランクです"}
                </div>
              </div>

              {/* ===== 昨年と今年の購入金額 ===== */}
              <div style={cardContentStyle}>
                <span>{`あなたの購入総額(${lastYear}-${thisYear})`}</span>
                <div style={{ fontSize: "40px" }}>
                  {customerInfo?.total_payment_from_last_year}
                </div>
                <div>
                  {customerInfo?.total_payment_from_last_year
                    ? `${lastYear}-01-01 - ${dayjs().format("YYYY-MM-DD")}`
                    : "まだ購入がありません"}
                </div>
              </div>

              {/* ===== 今年の購入金額 ===== */}
              <div style={cardContentStyle}>
                <span>{`あなたの購入総額(${thisYear})`}</span>
                <div style={{ fontSize: "40px" }}>
                  {rankingInfo?.thisYearPayment}
                </div>
                <div>
                  {rankingInfo?.firstOrderDate
                    ? `${rankingInfo?.firstOrderDate} - ${dayjs().format(
                        "YYYY-MM-DD"
                      )}`
                    : "まだ購入がありません"}
                </div>
              </div>

              {/* ===== 次のランクまでに必要な購入金額 ===== */}
              <div style={cardContentStyle}>
                <span>次のランクまでに必要な購入金額</span>
                <div style={{ fontSize: "40px" }}>
                  {rankingInfo?.restPaymentForNextRanking ?? 0}
                </div>
              </div>

              {/* ===== 現在のランクを維持するのに必要な購入金額 ===== */}
              <div style={cardContentStyle}>
                <span>現在のランクを維持するのに必要な購入金額</span>
                <div style={{ fontSize: "40px" }}>
                  {rankingInfo?.restPaymentToKeepRanking}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

const RankingBar: FC<{
  rankingBarWidth: number;
  totalPayment: number;
  currentRanking?: TRanking;
}> = ({ rankingBarWidth, totalPayment, currentRanking }) => {
  const bars = [...Object.values(RANKING), "CUSTOMER"] as const;
  return (
    <div style={{ paddingBottom: "1rem" }}>
      {bars.map(ranking => {
        return (
          <RankingBarContent
            key={ranking}
            ranking={ranking}
            rankingBarWidth={rankingBarWidth}
            totalPayment={totalPayment}
            currentRanking={currentRanking}
          />
        );
      })}
    </div>
  );
};

const RankingBarContent: FC<{
  ranking: TRanking | "CUSTOMER";
  rankingBarWidth: number;
  totalPayment: number;
  currentRanking?: TRanking;
}> = ({ ranking, rankingBarWidth, totalPayment, currentRanking }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const colorWidth = getRankingBarWidth(ranking, rankingBarWidth, totalPayment);
  const color = getRankingBarColor(ranking);

  return (
    <div style={{ position: "absolute" }}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...getRankingBarStyle(
            ranking,
            rankingBarWidth,
            totalPayment,
            currentRanking
          ),
        }}
      />
      {isHover && (
        <div
          style={{
            position: "relative",
            top: "-80px",
            left: `${colorWidth - colorWidth * 0.5}px`,
            color: color,
            backgroundColor: "white",
            border: `2px solid ${color}`,
            fontWeight: "bold",
            padding: "1rem",
            margin: "1rem",
          }}
        >
          <span>{RANKING_STRING[ranking]}</span>
          {color === "blue" && <span>{` : ${totalPayment}`}</span>}
        </div>
      )}
    </div>
  );
};

const cardContentStyle = {
  border: "1px solid gray",
  borderRadius: "4px",
  margin: "1rem",
  padding: "1rem",
  height: "auto",
  maxWidth: "500px",
  maxHeight: "250px",
};
