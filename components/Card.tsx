import { ComponentProps, FC } from "react";

type Props = {
  children?: React.ReactNode;
  restStyle?: ComponentProps<"div">["style"];
};

export const Card: FC<Props> = ({ children, restStyle }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "16px",
        margin: "16px",
        boxShadow: "4px 4px 0px 0px rgba(0, 0, 0, 0.2)",
        ...restStyle,
      }}
    >
      {children}
    </div>
  );
};
