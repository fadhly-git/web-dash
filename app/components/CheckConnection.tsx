"use client";

import { useEffect, useState } from "react";

type DataItem = {
  id: number;
  username: string;
  password: string;
};

export default function Home() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data dari MySQL (JSON)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Menampilkan JSON */}
    </div>
  );
}
