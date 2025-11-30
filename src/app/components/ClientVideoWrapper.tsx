"use client";

import dynamic from "next/dynamic";

const VideoPreview = dynamic(() => import("./VideoPreview"), { ssr: false });

export default function ClientVideoWrapper() {
  return <VideoPreview />;
}
