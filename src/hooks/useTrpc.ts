import { trpc } from "@/lib/trpc";
import { isDev } from "@/lib/utils";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { getPlatformProxy } from "wrangler";
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
  console.log(process.env.NODE_ENV);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url:
            process.env.NODE_ENV === "development"
              ? "http://localhost:8787/trpc"
              : "https://backend.akmt-me23.workers.dev/trpc",
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
