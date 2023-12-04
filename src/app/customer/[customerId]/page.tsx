"use client";
import Link from "next/link";
import { useCustomer } from "../../../../hooks/customer/useCustomer";
import { CustomerInfo } from "./CustomerInfo";
import { RankingInfo } from "./RankingInfo";

export default function Customer() {
  const { customerInfo, rankingInfo } = useCustomer();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: "20px" }}>
        <Link href="/">Home</Link>
      </div>
      <CustomerInfo customerInfo={customerInfo} />
      <br />
      <RankingInfo customerInfo={customerInfo} rankingInfo={rankingInfo} />
    </div>
  );
}
