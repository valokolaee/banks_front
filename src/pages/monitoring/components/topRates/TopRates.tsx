import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { csvTopRatesUrls } from "../../../../constants/constansValues";
 // import ProfileImage from "../../../../../components/ui/ProfileImage";

const TopRates: React.FC = () => {
  const [dataList, setDataList] = useState<
    { name: string; values: string[] }[]
  >([]);

  const fetchCsv = async (url: string): Promise<string[]> => {
    const response = await fetch(url);
    const text = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse<string[]>(text, {
        header: false,
        complete: (results) => {
          const rows = results.data as string[][];
          if (rows.length > 1) {
            resolve(rows[1]);
          } else {
            resolve([]);
          }
        },
        error: (err: any) => reject(err),
      });
    });
  };

  const fetchAllCsvs = async () => {
    try {
      const entries = await Promise.all(
        Object.entries(csvTopRatesUrls).map(async ([name, url]) => {
          const values = await fetchCsv(url);
          return { name, values };
        })
      );
      setDataList(entries);
    } catch (error) {
      console.error("Failed to fetch CSVs:", error);
    }
  };

  useEffect(() => {
    fetchAllCsvs();

    const interval = setInterval(() => {
      fetchAllCsvs();
    }, 60000); // 60 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="text-white overflow-x-auto w-full px-2">
      <div className="min-w-[700px] flex flex-row gap-1 mb-2 ">
        <div className="w-1/5 font-semibold"></div>
        <div className="w-1/5 font-semibold">Base Invest</div>
        <div className="w-1/5 font-semibold">Last Transaction</div>
        <div className="w-1/5 font-semibold">Total Profit</div>
        <div className="w-1/5 font-semibold">Total Revenue</div>
      </div>

      {dataList.map((item) => (
        <div
          key={item.name}
          className="min-w-[700px] border-b py-2 flex flex-row gap-1"
        >
          {/* <div className="w-1/5 font-bold flex flex-row gap-2"> <ProfileImage size="1.5rem" />{item.name}</div> */}
          {item.values.map((value, index) => (
            <div key={index} className="w-1/5 truncate">
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopRates;
