import { useEffect } from "react";

interface AdSenseProps {
  className?: string;
  style?: React.CSSProperties;
  client?: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

const AdSense = ({
  className = "adsbygoogle",
  style = { display: "block" },
  client = "ca-pub-8597674308771036", // Matches your existing publisher ID from index.html
  slot,
  format = "auto",
  responsive = true,
}: AdSenseProps) => {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is added by the external script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className={className}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
};

export default AdSense;
