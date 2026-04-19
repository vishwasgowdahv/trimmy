import React from "react";

const UrlCard = () => {
  return (
    <div className="flex flex-col lg:flex-row border border-gray-200 rounded-lg p-4 lg:p-6 mx-1 lg:mx-10  w-fit lg:w-full justify-between">
      <div className="flex justify-start gap-2">
        <div className="hidden lg:block">
          <img src="/src/assets/qr.svg" className="w-20 h-20" alt="" />
        </div>
        <div>
          <div className="flex gap-2">
            <p className="bg-gray-100 inline-block rounded-lg p-2">
              https://trimmy.com/a1b2c3d4
            </p>
            <button className=" bg-gray-100 rounded-lg p-2 w-9 h-9">
              <img src="/src/assets/copy.png" alt="" />
            </button>
          </div>
          <p className="px-2 text-sm font-light">https://google.com</p>
          <div className="flex py-1">
            <p className="px-2 text-xs font-bold">240 clicks</p>
            <p className="px-2 text-xs font-light">● 2 hours ago</p>
            <p className="px-2 text-xs font-light">● United States</p>
            <p className="px-2 text-xs font-light">● Windows</p>
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
