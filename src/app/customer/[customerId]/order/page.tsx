"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { url } from "../../../../../constants/url";

// TODO: このページはまだ作っていない
export default function Order() {
  const { customerId } = useParams();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/api/v1/order/${customerId}`);
      const data = await res.json();
    })();
  }, []);

  return <div>Order Page customerId = {customerId}</div>;
}
