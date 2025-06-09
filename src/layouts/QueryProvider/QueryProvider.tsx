"use client";

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { ReactNode } from "react";

import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const { overlay } = useOverlay();
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const message =
          axiosError?.response?.data?.message ||
          "문제가 발생했습니다. 다시 시도해주세요.";
        overlay(<ConfirmModal message={message} />);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
