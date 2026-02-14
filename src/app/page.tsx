"use client";

import dynamic from "next/dynamic";

const JsonFormatter = dynamic(() => import("@/components/JsonFormatter"), {
  ssr: false,
});

export default function Home() {
  return <JsonFormatter />;
}
