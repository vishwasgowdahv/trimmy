import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUrls } from "@/hooks/useUrls";

const UrlShorten = () => {
  const { createUrl, loading, error } = useUrls();
  const [url, setUrl] = useState("");
  return (
    <>
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          onClick={() => createUrl(url)}
          disabled={loading}
          className="h-12"
        >
          {loading ? "Shortening..." : "Shorten"}
        </Button>
      </Field>
    </>
  );
};

export default UrlShorten;
