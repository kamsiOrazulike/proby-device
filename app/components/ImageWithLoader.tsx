import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  loadingTime?: number;
}

const ImageWithLoader = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  loadingTime = 2000,
}: ImageWithLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  return (
    <div className="relative h-[400px] -mt-4 mb-8">
      {isLoading && (
        <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 absolute inset-0 z-10">
          <div className="flex items-center justify-center w-full h-full bg-[#1a1a3e] rounded">
            <svg
              className="w-10 h-10 text-[#36357F]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100 object-contain narrow"
        }`}
        priority
      />
    </div>
  );
};

export default ImageWithLoader;
