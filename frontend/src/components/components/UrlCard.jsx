import React, { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { analyticsService } from "../../services/analyticsService";
import { useUrls } from "../../hooks/useUrls";
import QRCodeComponent from "./QrCodeComponent.jsx";
import Modal from "./Modal.jsx";
import {
  Copy,
  Check,
  Trash2,
  BarChart3,
  QrCode,
  Calendar,
  ExternalLink,
  MousePointerClick,
} from "lucide-react";

const MAIN_URL = import.meta.env.VITE_MAIN_URL;

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
        setAnalytics(response.data);
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

  const shortUrl = `${MAIN_URL}/${urlData.short_code}`;

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

      <div className="group bg-white border border-gray-100 rounded-2xl p-4 md:p-6 transition-all hover:shadow-md hover:border-blue-100 flex flex-col sm:flex-row gap-4 md:gap-5 items-start w-full overflow-hidden">
        {/* Left: QR Code (Desktop only) */}
        <div
          onClick={() =>
            setModalOptions({
              isOpen: true,
              onClose: () =>
                setModalOptions({ ...ModalOptions, isOpen: false }),
              onConfirm: () =>
                setModalOptions({ ...ModalOptions, isOpen: false }),
              title: "QR Code",
              description: shortUrl,
              confirmText: "Download",
              type: "info",
              data: shortUrl,
            })
          }
          className="hidden md:flex shrink-0 cursor-pointer bg-gray-50 p-3 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
        >
          <QRCodeComponent url={shortUrl} size={80} />
        </div>

        {/* Middle: Content */}
        <div className="grow min-w-0 w-full">
          <div className="flex flex-col gap-1 mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-blue-600 truncate">
                /{urlData.short_code}
              </h3>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors shrink-0"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p
              className="text-xs md:text-sm text-gray-400 font-medium break-all line-clamp-1 italic"
              title={urlData.original_url}
            >
              {urlData.original_url}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 items-center">
            <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shrink-0">
              <MousePointerClick size={14} className="text-blue-500" />
              <span className="text-[10px] md:text-xs font-bold">
                {loading
                  ? "..."
                  : `${analytics?.stats?.total_clicks || 0} clicks`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
              <Calendar size={14} />
              <span className="text-[10px] md:text-xs font-medium">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 flex-wrap">
          <div className="flex grow sm:grow-0 gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`grow sm:grow-0 p-2 md:p-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                copied
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"
              }`}
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span className="sm:hidden text-xs md:text-sm font-semibold">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>

            <button
              className="grow sm:grow-0 p-2 md:p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-white"
              title="View Analytics"
            >
              <BarChart3 size={18} />
              <span className="sm:hidden text-xs md:text-sm font-semibold">
                Stats
              </span>
            </button>
          </div>

          <div className="flex grow sm:grow-0 gap-2">
            <button
              onClick={() =>
                setModalOptions({
                  isOpen: true,
                  onClose: () =>
                    setModalOptions({ ...ModalOptions, isOpen: false }),
                  onConfirm: handleDelete,
                  title: "Delete URL",
                  description:
                    "Are you sure you want to delete this URL? This action cannot be undone.",
                  confirmText: "Delete",
                  type: "danger",
                })
              }
              className="grow sm:grow-0 p-2 md:p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600 transition-all flex items-center justify-center gap-2 bg-white"
              title="Delete URL"
            >
              <Trash2 size={18} />
              <span className="sm:hidden text-xs md:text-sm font-semibold">
                Delete
              </span>
            </button>

            <button
              onClick={() =>
                setModalOptions({
                  isOpen: true,
                  onClose: () =>
                    setModalOptions({ ...ModalOptions, isOpen: false }),
                  onConfirm: () => {},
                  title: "QR Code",
                  description: shortUrl,
                  confirmText: "Download",
                  type: "info",
                  data: shortUrl,
                })
              }
              className="md:hidden grow p-2 md:p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2 bg-white"
            >
              <QrCode size={18} />
              <span className="text-xs md:text-sm font-semibold">QR</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrlCard;
