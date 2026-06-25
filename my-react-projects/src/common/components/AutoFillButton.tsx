import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface AutoFillProps<T> {
  title: string;
  onFillData: React.Dispatch<React.SetStateAction<T>>;
  data: T;
}

export default function AutoFillButton<T>({
  title,
  onFillData,
  data,
  className,
}: AutoFillProps<T> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const handleFillData = () => {
    onFillData(data);
  };

  return (
    <button
      type="button"
      onClick={handleFillData}
      className={cn("btn", className)}
    >
      {title}
    </button>
  );
}
