import { trpc } from "@/lib/trpc";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

export const useTrpc = () => {
  const [trpcQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Number.POSITIVE_INFINITY,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8787/trpc",
          headers: () => ({
            Authorization:
              window.localStorage.getItem("oauth_access_token") ?? undefined,
          }),
        }),
      ],
    })
  );

  return {
    trpcQueryClient,
    trpcClient,
  };
};
