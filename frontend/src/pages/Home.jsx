import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UrlCard from "@/components/components/UrlCard.jsx";
import { useUrls } from "../hooks/useUrls";
import { useAnalytics } from "../hooks/useAnalytics";

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
    
  }, []);
  return (
    <div className="w-full px-5 lg:px-50 flex flex-col gap-5 justify-center items-center">
      <div className="flex justify-center items-center flex-col mt-10 mb-10 gap-5 ">
        <h1 className="text-5xl text-center font-bold">Shorten Your URLs</h1>
        <h3 className="text-lg text-center font-light">
          Transform long URLs into clean, shareable links in seconds
        </h3>
      </div>
      <Field
        className="lg:w-1/2 w-full mx-auto border border-gray-200 rounded-lg p-6"
        orientation="horizontal"
      >
        <Input
          className="h-12 w-full"
          type="search"
          placeholder="Enter Your Long URL Here..."
        />
        <Button className="h-12">Shorten</Button>
      </Field>
      <div className="flex justify-center items-left flex-col mt-20 mb-10 gap-5 ">
        <h1 className="text-4xl text-left font-bold">Your Shortened URLs</h1>
        <h3 className="text-lg text-left font-light">
          Manage and track all your shortened links
        </h3>
      </div>

      {urls.length > 0 ? (
        urls.map((url) => (
          <UrlCard
            key={url.id}
            created_at={url.created_at}
            short_code={url.short_code}
            original_url={url.original_url}
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
