"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const url = "http://localhost:3000";

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
