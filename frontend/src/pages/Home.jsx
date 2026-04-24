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
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <header className="pt-10 pb-6 text-center">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900">
            Welcome, <span className="text-blue-600 font-extrabold">{user?.name || 'User'}</span>
          </h1>
        </header>

        <section className="mb-12">
          <UrlShorten />
        </section>

        <div className="space-y-8">
          {urls?.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-8 border-b border-gray-50 flex flex-col items-center text-center gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Your Shortened URLs
                </h2>
                <p className="text-gray-500 font-medium">
                  You have {urls.length} active links in your account
                </p>
              </div>

              <div className="p-4 md:p-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-xl text-gray-600 font-bold animate-pulse">
                Fetching your links...
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 py-20 px-4 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                 <img className="w-8 h-8 opacity-20" src="/assets/link.png" alt="" />
              </div>
              <p className="text-gray-500 text-xl font-bold">
                No shortened URLs found yet
              </p>
              <p className="text-gray-400 mt-2">Start by shortening your first long URL above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
