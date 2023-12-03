import { h1Style, h2Style } from "@/app/styles";
import { FC } from "react";
import {
  CUSTOMER_INFO_STRING,
  TCustomerInfo,
} from "../../../../constants/customerInfo";

type Props = {
  customerInfo: TCustomerInfo | null;
};

export const CustomerInfo: FC<Props> = ({ customerInfo }) => {
  return (
    <>
      <h1 style={h1Style}>Customer Info</h1>
      <h2 style={h2Style}>Base Info</h2>
      {customerInfo ? (
        <table>
          <thead>
            <tr>
              <th colSpan={2}>BaseInfo</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(customerInfo).map(([key, value]) => {
              const displayStr =
                CUSTOMER_INFO_STRING[key as keyof TCustomerInfo];
              if (displayStr === undefined) return null;

              return (
                <tr key={key}>
                  <td>{displayStr}</td>
                  <td>
                    {key === "registered_at" && typeof value === "string"
                      ? value.split("T")[0]
                      : value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <span>loading...</span>
      )}
    </>
  );
};
