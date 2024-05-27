import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lots/test")({
	component: () => <div>Hello /dashboard/lots/test!</div>,
});
