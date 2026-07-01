import { StickyNote } from "lucide-react";
import cn from "../utils/cn";

interface EmptyStateProps {
  text: string;
  className?: string;
}

export default function EmptyState({ text, className }: EmptyStateProps) {
  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 p-4",
          className,
        )}
      >
        <StickyNote
          className="text-base-content/30"
          size={52}
          strokeWidth={1.5}
        />
        <p className="text-center text-sm text-base-content/60">{text}</p>
      </div>
    </>
  );
}
