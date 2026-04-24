import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUrls } from "@/hooks/useUrls";

const UrlShorten = () => {
  const { createUrl, loading, error } = useUrls();
  const [url, setUrl] = useState("");
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col items-center text-center mb-10 gap-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
          Shorten Your <span className="text-blue-600">URLs</span>
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Transform long, complex links into clean, shareable URLs in seconds. Track your growth and reach.
        </p>
      </div>

      <div className="bg-white p-2 md:p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-3 transition-shadow hover:shadow-2xl">
        <div className="grow">
          <Input
            className="h-14 w-full text-lg border-none focus-visible:ring-0 px-4 placeholder:text-gray-400"
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            if (url) {
              createUrl(url);
              setUrl("");
            }
          }}
          disabled={loading || !url}
          className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Shortening...
            </span>
          ) : (
            "Shorten"
          )}
        </Button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-500 font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
};

export default UrlShorten;
