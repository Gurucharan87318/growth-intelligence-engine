"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  fallbackHref?: string;
};

export function BackButton({ fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-9 w-fit rounded-lg px-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      onClick={handleBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
}
