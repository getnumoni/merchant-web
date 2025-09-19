import QRCode from "react-qr-code";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function QRCodeDisplay({
  value,
  size = 180,
  className = "",
  style = {}
}: QRCodeDisplayProps) {
  return (
    <div className={`bg-white p-2 flex items-center justify-center ${className}`}>
      <QRCode
        value={value}
        size={size}
        style={{
          height: "auto",
          maxWidth: "100%",
          width: "100%",
          ...style
        }}
      />
    </div>
  );
}
