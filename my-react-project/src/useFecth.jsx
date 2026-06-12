import { useState, useEffect } from "react";

export default function useFecth(url) {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to get Data");

        const data = await res.json();
        setdata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [url]);


  return {data, isLoading, error}
}