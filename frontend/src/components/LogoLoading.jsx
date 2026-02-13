import { useEffect, useState } from "react";
import romanceLogo from "../assets/rom.png";

/**
 * LogoLoading
 * Props:
 * - onComplete: optional callback called after hide (if autoHide)
 * - duration: ms to wait before hiding (default 3000)
 * - autoHide: whether to auto hide after duration (default true)
 * - src: image source (default romanceLogo)
 * - alt: image alt text
 * - sizeClass: tailwind size classes for image (default "w-64 h-64")
 * - className: extra classes for image animation
 * - containerClassName: classes for the wrapper
 */
const LogoLoading = ({
  onComplete,
  duration = 3000,
  autoHide = true,
  src = romanceLogo,
  alt = "Romance Logo",
  sizeClass = "w-64 h-64",
  className = "logo-animate",
  containerClassName = "flex flex-col items-center justify-center h-screen logo-container",
  style,
} = {}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoHide) return;
    const t = setTimeout(() => {
      setVisible(false);
      if (typeof onComplete === "function") onComplete();
    }, duration);
    return () => clearTimeout(t);
  }, [onComplete, duration, autoHide]);

  if (!visible) return null;

  return (
    <div className={containerClassName} style={style}>
      <img src={src} alt={alt} className={`${sizeClass} mb-3 ${className}`} />
    </div>
  );
};


export default LogoLoading;
