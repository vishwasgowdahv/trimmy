import React from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import UrlCard from "@/components/components/UrlCard.jsx";
const Landing = () => {
  return (
    <div className="w-full px-5 lg:px-50 flex flex-col gap-5">
      <img className="w-20 h-20 mx-auto" src="/src/assets/link.png" alt="" />
      <div className="flex justify-center items-center flex-col mt-10 mb-10 gap-5 ">
        <h1 className="text-5xl text-center font-bold ">Shorten Your URLs</h1>
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
    </div>
  );
};

export default Landing;
