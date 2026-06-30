import {  useState, type ChangeEvent } from "react";

export default function DraftText() {
  const [text, setText] = useState<string>(() => {
    try {
      return localStorage.getItem("draft-note") ?? "";
    } catch {
      return "";
    }
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
    try {
      localStorage.setItem("draft-note", value);
    } catch {
      console.error("Error while saving")
    }
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
        </div>
      </div>
    </>
  );
}
