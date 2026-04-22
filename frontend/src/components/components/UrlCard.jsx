import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { analyticsService } from "../../services/analyticsService";
import { useUrls } from "../../hooks/useUrls";
import QRCodeComponent from "./QrCodeComponent.jsx";
import Modal from "./Modal.jsx";

const UrlCard = ({ urlData }) => {
  const [open, setOpen] = useState(false);
  const { deleteUrl } = useUrls();
  const [copied, setCopied] = useState(false);
  const copyRef = useRef(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ModalOptions, setModalOptions] = useState({
    isOpen: false,
    onClose: () => setModalOptions(false),
    onConfirm: () => {},
    title: "",
    description: "",
    confirmText: "",
    type: "",
    data: "",
  });

  const handleDelete = () => {
    deleteUrl(urlData.id);
    console.log("Deleted!");
    setModalOptions({ ...ModalOptions, isOpen: false });
  };

  const date = urlData.created_at ? new Date(urlData.created_at) : null;
  const formattedDate =
    date && !isNaN(date.getTime()) ? format(date, "MMM dd, yyyy") : "N/A";

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getAnalytics(
          urlData.short_code,
        );
        setAnalytics(response.data); // Accessing .data from ApiResponse wrapper
      } catch (error) {
        console.error(
          "Failed to fetch analytics for",
          urlData.short_code,
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    if (urlData.short_code) {
      getStats();
    }
  }, [urlData.short_code]);

  return (
    <>
      <Modal
        isOpen={ModalOptions.isOpen}
        onClose={ModalOptions.onClose}
        onConfirm={ModalOptions.onConfirm}
        title={ModalOptions.title}
        description={ModalOptions.description}
        confirmText={ModalOptions.confirmText}
        type={ModalOptions.type}
        data={ModalOptions.data}
      />

      <div className="flex flex-col lg:flex-row border border-gray-200 rounded-lg p-4 lg:p-6 mx-1 lg:mx-10  w-fit lg:w-full justify-between">
        <div className="flex justify-start gap-2">
          <div
            onClick={() =>
              setModalOptions({
                isOpen: true,
                onClose: () =>
                  setModalOptions({ ...ModalOptions, isOpen: false }),
                onConfirm: () =>
                  setModalOptions({ ...ModalOptions, isOpen: false }),
                title: "QR Code",
                description: `http://localhost:8000/${urlData.short_code}`,
                confirmText: "Download",
                type: "info",
                data: `http://localhost:8000/${urlData.short_code}`,
              })
            }
            className="hidden lg:block cursor-pointer"
          >
            <QRCodeComponent
              url={`http://localhost:8000/${urlData.short_code}`}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <input
                className="bg-gray-100 inline-block rounded-lg p-2 text-md"
                ref={copyRef}
                value={`http://localhost:8000/${urlData.short_code}`}
                readOnly
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(copyRef.current.value);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className=" bg-gray-100 rounded-lg p-2 w-9 h-9"
              >
                {copied ? (
                  <img src="/src/assets/check.png" alt="" />
                ) : (
                  <img src="/src/assets/copy.png" alt="" />
                )}
              </button>
            </div>
            <p className="px-2 text-sm font-light">{urlData.original_url}</p>
            <div className="flex py-1">
              <p className="px-2 text-xs font-bold">
                {loading
                  ? "..."
                  : `${analytics?.stats?.total_clicks || 0} clicks`}
              </p>
              <p className="px-2 text-xs font-light">● {formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-row lg:flex-col">
          <button className="border rounded-lg p-2 w-10 h-10">
            <img src="/src/assets/analysis.png" alt="" />
          </button>
          <button
            onClick={() => {
              setModalOptions({
                isOpen: true,
                onClose: () =>
                  setModalOptions({ ...ModalOptions, isOpen: false }),
                onConfirm: handleDelete,
                title: "Delete URL",
                description: "Are you sure you want to delete this URL?",
                confirmText: "Delete",
                type: "danger",
              });
            }}
            className="border rounded-lg p-2 w-10 h-10"
          >
            <img src="/src/assets/delete.png" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default UrlCard;
