"use client";
import React, { useState, useEffect } from "react";
export default function VideoPreview() {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideo() {
      const response = await fetch("/videos/professional.mp4");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    }

    loadVideo();

    // Cleanup
    return () => {
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, []);

  return (
    <>
      {videoURL && (
        <video
          src={videoURL}
          autoPlay
          loop
          muted
          playsInline
          className="absolute size-full object-cover z-0"
        />
      )}
    </>
  );
}
