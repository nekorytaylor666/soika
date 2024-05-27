import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { ThemeProvider } from "../theme-provider";
import { useTrpc } from "@/hooks/useTrpc";
import { trpc } from "@/lib/trpc";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { Toaster } from "../ui/sonner";
import { supabase } from "@/lib/supabase";

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const router = createRouter({ routeTree });
export const Providers = ({ children }: PropsWithChildren) => {
	const { trpcQueryClient, trpcClient } = useTrpc();

	supabase.auth.onAuthStateChange((event, session) => {
		console.log(event);
		if (session?.access_token) {
			window.localStorage.setItem("oauth_access_token", session.access_token);
		}

		if (session?.refresh_token) {
			window.localStorage.setItem("oauth_refresh_token", session.refresh_token);
		}

		if (event === "SIGNED_OUT") {
			window.localStorage.removeItem("oauth_access_token");
			window.localStorage.removeItem("oauth_refresh_token");
		}
	});
	return (
		<trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
			<QueryClientProvider client={trpcQueryClient}>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<Toaster />
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};
