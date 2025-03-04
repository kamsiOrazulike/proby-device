"use client";
import React, { useState, useEffect, useCallback, memo } from "react";

interface ProgressBarProps {
  progress: number;
}

interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

// Memoize the progress bar component
const ProgressBar = memo(
  ({ progress }: ProgressBarProps): React.ReactElement => (
    <div className="h-[0.09rem] w-full bg-black/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-black rounded-full transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
);

ProgressBar.displayName = "ProgressBar";

const PageLoader = ({
  isLoading,
  onLoadingComplete,
}: PageLoaderProps): React.ReactElement | null => {
  const [progress, setProgress] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [pageReady, setPageReady] = useState<boolean>(false);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  // Memoize the progress calculation function
  const calculateProgress = useCallback((prev: number): number => {
    if (prev < 50) {
      return Math.min(50, prev + Math.random() * 8);
    }
    if (prev < 80) {
      return prev + Math.random() * 4;
    }
    return Math.min(90, prev + Math.random() * 2);
  }, []);

  const handleComplete = useCallback((): void => {
    setIsComplete(true);
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  // Check if page elements are fully rendered
  useEffect(() => {
    const checkPageReady = (): boolean => {
      // Check if key elements are in the DOM and visible
      const mainElements = document.querySelectorAll(".main-content, canvas");
      const allElementsLoaded = mainElements.length > 0;

      if (allElementsLoaded) {
        // Add a small delay to ensure everything is visible
        setTimeout(() => {
          setPageReady(true);
        }, 800); // Extra delay after elements are detected

        return true;
      }

      return false;
    };

    // Check every 200ms if the page is ready
    const readyCheckInterval = setInterval(() => {
      if (checkPageReady()) {
        clearInterval(readyCheckInterval);
      }
    }, 200);

    // Set timeout for loading (10 seconds)
    const timeoutTimer = setTimeout(() => {
      clearInterval(readyCheckInterval);

      if (!pageReady) {
        setTimedOut(true);
        setPageReady(true); // Force continue anyway
      }
    }, 10000);

    return () => {
      clearInterval(readyCheckInterval);
      clearTimeout(timeoutTimer);
    };
  }, []);

  // Handle main loading logic
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let fadeTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    if (isLoading && !pageReady) {
      requestAnimationFrame(() => {
        setProgress(0);
        setOpacity(1);
        setIsComplete(false);
      });

      progressTimer = setInterval(() => {
        setProgress(calculateProgress);
      }, 50);
    } else {
      clearInterval(progressTimer!);

      requestAnimationFrame(() => {
        if (timedOut) {
          setProgress(100);
          setOpacity(0.7);

          fadeTimer = setTimeout(() => {
            setOpacity(1);

            setTimeout(() => {
              setOpacity(0);
              completeTimer = setTimeout(handleComplete, 300);
            }, 300);
          }, 300);
        } else {
          setProgress(100);

          fadeTimer = setTimeout(() => {
            setOpacity(0);
            completeTimer = setTimeout(handleComplete, 200);
          }, 100);
        }
      });
    }

    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isLoading, pageReady, calculateProgress, handleComplete, timedOut]);

  if (isComplete) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute overflow-x-hidden overflow-y-clip inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{
        opacity,
        transition:
          opacity === 0 ? "opacity 0.3s ease-out" : "opacity 0.2s ease-in-out",
        pointerEvents: opacity === 0 ? "none" : "auto",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        willChange: "opacity",
      }}
    >
      <div className="w-64 sm:w-96 relative">
        {timedOut && (
          <div className="text-xs text-black/50 mb-2 text-center">
            Taking longer than expected...
          </div>
        )}
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default memo(PageLoader);
