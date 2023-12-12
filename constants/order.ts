type Order = {
  customer_id: number;
  id: number;
  order_id: string;
  ordered_at: string;
  total_in_cents: number;
};

export type Orders = Order[];
