import { useEffect } from "react";
import QRCodeComponent from "./QrCodeComponent";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", // default | danger | success
  children,
  data = "",
}) {
  // close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmColor =
    type === "danger"
      ? "bg-red-600 hover:bg-red-700 shadow-red-100"
      : type === "success"
        ? "bg-green-600 hover:bg-green-700 shadow-green-100"
        : "bg-blue-600 hover:bg-blue-700 shadow-blue-100";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10 transform transition-all animate-in zoom-in-95 duration-300 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* TITLE */}
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          )}

          {/* DESCRIPTION */}
          {description && (
            <p className="text-gray-500 font-medium mb-6 leading-relaxed">
              {description}
            </p>
          )}

          {/* CUSTOM CONTENT */}
          {children && <div className="mb-6">{children}</div>}

          {/* QR Code Container */}
          {data && (
            <div className="my-8 flex justify-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <QRCodeComponent url={data} size={220} />
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="grow px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`grow px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] ${confirmColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
