import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { analyticsService } from "../../services/analyticsService";

const UrlCard = ({ short_code, original_url, created_at }) => {
  const [copied, setCopied] = useState(false);
  const copyRef = useRef(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const date = new Date(created_at);
  const formattedDate = format(date, "MMM dd, yyyy");

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getAnalytics(short_code);
        setAnalytics(response.data); // Accessing .data from ApiResponse wrapper
      } catch (error) {
        console.error("Failed to fetch analytics for", short_code, error);
      } finally {
        setLoading(false);
      }
    };

    if (short_code) {
      getStats();
    }
  }, [short_code]);

  return (
    <div className="flex flex-col lg:flex-row border border-gray-200 rounded-lg p-4 lg:p-6 mx-1 lg:mx-10  w-fit lg:w-full justify-between">
      <div className="flex justify-start gap-2">
        <div className="hidden lg:block">
          <img src="/src/assets/qr.svg" className="w-20 h-20" alt="" />
        </div>
        <div>
          <div className="flex gap-2">
            <p className="bg-gray-100 inline-block rounded-lg p-2">
              {`https://localhost:8000/${short_code}`}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://localhost:8000/${short_code}`
                );
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              ref={copyRef}
              className=" bg-gray-100 rounded-lg p-2 w-9 h-9"
            >
              {copied ? (
                <img src="/src/assets/check.png" alt="" />
              ) : (
                <img src="/src/assets/copy.png" alt="" />
              )}
            </button>
          </div>
          <p className="px-2 text-sm font-light">{original_url}</p>
          <div className="flex py-1">
            <p className="px-2 text-xs font-bold">
              {loading
                ? "..."
                : `${analytics?.stats?.total_clicks || 0} clicks`}
            </p>
            <p className="px-2 text-xs font-light">● {formattedDate}</p>
            {/* <p className="px-2 text-xs font-light">● United States</p>
            <p className="px-2 text-xs font-light">● Windows</p> */}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-row lg:flex-col">
        <button className="border rounded-lg p-2 w-10 h-10">
          <img src="/src/assets/analysis.png" alt="" />
        </button>
        <button className="border rounded-lg p-2 w-10 h-10">
          <img src="/src/assets/share.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
