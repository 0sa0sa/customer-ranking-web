import { useParams } from "next/navigation";
import { useState } from "react";
import { TCustomerInfo } from "../../constants/customerInfo";
import { TRankingInfo } from "../../constants/ranking";
import { url } from "../../constants/url";
import { useEffectOnce } from "../useEffectOnce";

export const useCustomer = () => {
  const { customerId } = useParams();
  const [customerInfo, setCustomerInfo] = useState<TCustomerInfo | null>(null);
  const [rankingInfo, setRankingInfo] = useState<TRankingInfo | null>(null);

  useEffectOnce(() => {
    (async () => {
      const res = await fetch(`${url}/api/v1/customer/${customerId}`);
      const data = await res.json();
      setCustomerInfo(data.customer);
      setRankingInfo(data.rankingInfo);
    })();
  });

  return { customerInfo, rankingInfo };
};
