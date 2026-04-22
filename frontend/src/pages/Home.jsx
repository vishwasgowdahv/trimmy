import React, { useState, useEffect } from "react";
import UrlCard from "@/components/components/UrlCard.jsx";
import { useUrls } from "../hooks/useUrls";
import { useAnalytics } from "../hooks/useAnalytics";
import UrlShorten from "@/components/components/UrlShorten.jsx";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { urls, loading, error, createUrl, fetchUrls } = useUrls();
  const { getUser, user } = useAuth();
  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
    fetchAnalytics,
  } = useAnalytics();

  useEffect(() => {
    getUser();
    fetchUrls();
  }, [urls?.length]);
  return (
    <div className="w-full px-5 lg:px-50 flex flex-col gap-5 justify-center items-center ">
      <h1 className="text-5xl text-left font-bold pt-10">
        Welcome, <span className="text-blue-500">{user?.name}</span>
      </h1>
      <UrlShorten />
      {urls?.length > 0 ? (
        <>
          <div className="flex justify-center items-left flex-col mt-10 mb-10 gap-5 ">
            <h1 className="text-4xl text-left font-bold">
              Your Shortened URLs
            </h1>
            <h3 className="text-lg text-left font-light">
              Manage and track all your shortened links
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {urls?.map((url) => (
              <UrlCard
                key={url?.id}
                urlData={url}
                created_at={url?.created_at}
                short_code={url?.short_code}
                original_url={url?.original_url}
                analytics={analytics}
              />
            ))}
          </div>
        </>
      ) : loading ? (
        <p className="text-2xl text-center font-bold">Your URLs are loading..., Please wait</p>
      ) : (
        <p className="text-gray-500 text-2xl text-center font-bold">No shortened URLs found!!</p>
      )}
    </div>
  );
};

export default Home;
