import { useEffect, useState } from "react";
import axios from "axios";

type options<T> = { defaultValue: T; enabled?: boolean };

export function useFetch<T>(
  url: string,
  { enabled, defaultValue }: options<T>,
) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (enabled === false) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, { signal: controller.signal });
        setData(res.data.result ?? defaultValue);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request aborted:", err);
        } else {
          console.error("API ERROR : ", err);
          setError(
            "Failed to load data. Please check your connection and try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
      console.log("Aborted!");
    };
  }, [url, enabled, defaultValue]);

  return { data, setData, isLoading, setLoading, error, setError };
}
