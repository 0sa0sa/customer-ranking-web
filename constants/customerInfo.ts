export type TCustomerInfo = {
  id: number;
  name: string;
  email: string;
  address: string;
  registered_at: string;
  total_payment_from_last_year: number;
};

export const CUSTOMER_INFO_STRING = {
  id: undefined,
  name: "名前",
  email: "メールアドレス",
  address: "住所",
  registered_at: "登録日",
  total_payment_from_last_year: undefined,
} as const;
