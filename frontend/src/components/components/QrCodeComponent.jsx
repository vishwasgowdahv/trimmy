import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeComponent({ url, size = 90 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeCanvas
        value={url}
        size={size}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
}
