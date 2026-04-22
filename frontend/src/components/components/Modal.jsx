import { useEffect } from "react";
import QRCodeComponent from "./QrCodeComponent";

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
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmColor =
    type === "danger"
      ? "bg-red-500 hover:bg-red-600"
      : type === "success"
        ? "bg-green-500 hover:bg-green-600"
        : "bg-blue-500 hover:bg-blue-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-10 m-10">
        {/* TITLE */}
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}

        {/* DESCRIPTION */}
        {description && <p className="text-gray-600 mb-4">{description}</p>}

        {/* CUSTOM CONTENT */}
        {children && <div className="mb-4">{children}</div>}

        {/*image*/}
        {data && (
          <div className="my-5">
            <QRCodeComponent url={data} size={200} />
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
