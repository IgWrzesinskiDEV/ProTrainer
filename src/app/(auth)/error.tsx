"use client";

import ErrorComponent from "@/components/errors/errorComponent";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComponent error={error} resetHandler={reset} />;
}
