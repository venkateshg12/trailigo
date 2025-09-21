import { useEffect, useState } from "react";

 export const useImagePreloader = (imageSources: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!imageSources.length) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    const totalImages = imageSources.length;

    const imagePromises = imageSources.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        
        const handleLoad = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };

        const handleError = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
          console.warn(`Failed to load image: ${src}`);
          resolve(); // Still resolve to continue loading other images
        };

        img.onload = handleLoad;
        img.onerror = handleError;
        img.src = src;

        // Timeout fallback
        setTimeout(() => {
          if (!img.complete) {
            console.warn(`Image loading timeout: ${src}`);
            handleError();
          }
        }, 10000); // 10 second timeout
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setImagesLoaded(true);
        }, 300);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Still proceed even if some images failed
      });

  }, [imageSources]);

  return { imagesLoaded, loadingProgress };
};
