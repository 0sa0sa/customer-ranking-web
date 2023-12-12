"use client";
import { useEffect, useState } from "react";
import { Orders } from "../../../../../constants/order";
import { url } from "../../../../../constants/url";

// TODO: このページはまだ作っていない
export default function Order() {
  // const { customerId } = useParams();
  const [orders, setOrders] = useState<Orders>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/api/v1/orders`);
      const rawRes = await res.json();
      setOrders(rawRes.orders);
    })();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>BaseInfo</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          return (
            <tr key={order.id}>
              <td>{order.order_id}</td>
              <td>{order.customer_id}</td>
              <td>{order.ordered_at}</td>
              <td>{order.total_in_cents}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
