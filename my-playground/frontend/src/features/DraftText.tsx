import type { ChangeEvent } from "react";
import useLocalStorage from "../common/hooks/useLocalStorage";
import { Eraser, RotateCcw } from "lucide-react";

export default function DraftText() {
  const [text, setText, clearText] = useLocalStorage(
    "draft-note",
    "New blank note",
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-md gap-1.5 mx-auto">
        <h3 className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
          {text}
        </h3>
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-base-content/40">
            Draft Note
          </span>
          <span className="text-xs text-success/70 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"></span>
            Saved
          </span>
        </div>

        <textarea
          className="textarea textarea-bordered w-full h-64 p-4 text-base font-serif leading-relaxed bg-base-100/50 focus:outline-none focus:border-primary/50 resize-none rounded-2xl shadow-inner placeholder:text-base-content/30"
          placeholder="Start drafting your notes here..."
          value={text}
          onChange={handleChange}
        />

        <div className="flex justify-between items-center px-1 text-xs text-base-content/40">
          <span>Draft is saved automatically</span>

          <div>
            <div className="tooltip" data-tip="Reset Content">
              <button
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => setText("")}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="tooltip" data-tip="Clear note data">
              <button
                className="btn btn-ghost btn-sm btn-square"
                onClick={clearText}
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
