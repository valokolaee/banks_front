import React, { useEffect, useRef, useState } from "react";
import { realTimeScriptCsv } from "../../../../constants/constansValues";

const RealTimeScript: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);


  const fetchData = async () => {
    try {
      const response = await fetch(realTimeScriptCsv);
      const text = await response.text();
      const rows = text.trim().split("\n").slice(-11); // Last 11 rows
      setLines(rows);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      setLines(["Error loading data"]);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (


    <div
      ref={scrollRef}
      className="h-72 overflow-y-auto bg-secondary rounded-lg p-3 text-light  "
    >
      {lines.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap ">
          {line}
        </div>
      ))}
    </div>

  );
};

export default RealTimeScript;
