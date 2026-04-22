import React, { useState, useEffect } from "react";
import UrlCard from "@/components/components/UrlCard.jsx";
import { useUrls } from "../hooks/useUrls";
import { useAnalytics } from "../hooks/useAnalytics";
import UrlShorten from "@/components/components/UrlShorten.jsx";

const Home = () => {
  const { urls, loading, error, createUrl, fetchUrls } = useUrls();
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    fetchAnalytics,
  } = useAnalytics();
  useEffect(() => {
    fetchUrls();
  }, [urls?.length]);
  return (
    <div className="w-full px-5 lg:px-50 flex flex-col gap-5 justify-center items-center">
      <UrlShorten />
      <div className="flex justify-center items-left flex-col mt-20 mb-10 gap-5 ">
        <h1 className="text-4xl text-left font-bold">Your Shortened URLs</h1>
        <h3 className="text-lg text-left font-light">
          Manage and track all your shortened links
        </h3>
      </div>

      {urls?.length > 0 ? (
        urls?.map((url) => (
          <UrlCard
            key={url?.id}
            created_at={url?.created_at}
            short_code={url?.short_code}
            original_url={url?.original_url}
            analytics={analytics}
          />
        ))
      ) : (
        <p>No shortened URLs found</p>
      )}
    </div>
  );
};

export default Home;
