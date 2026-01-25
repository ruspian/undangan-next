import Cover from "@/components/Cover";
import MainContent from "@/components/MainContent";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Suspense fallback={<div className="fixed inset-0 bg-[#F4F7F5]" />}>
        <Cover />
      </Suspense>

      <MainContent />
    </main>
  );
}
