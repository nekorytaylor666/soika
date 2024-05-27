import {
	Link,
	Outlet,
	createFileRoute,
	createLazyFileRoute,
} from "@tanstack/react-router";
import Sidebar from "@/components/sidebar";
import MainContent from "@/components/MainContent";
import { Button } from "@/components/ui/button";
import { Hash, Inbox, Plus, SquareKanban } from "lucide-react";
import { redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { trpc } from "@/lib/trpc";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getSession();
		console.log(data);
		if (!data.session) {
			throw redirect({ to: "/login" });
		}
	},
	pendingComponent: PendingComponent,
});

export function Dashboard() {
	const [boards] = trpc.board.getAllByUser.useSuspenseQuery();

	console.log(boards);
	return (
		<div className="grid grid-cols-[56px_auto_80%]  min-h-screen max-w-screen w-full bg-muted/40">
			<Sidebar />

			<div className="bg-background border-r  w-full flex flex-col px-4">
				<div className="flex items-center h-16">
					<h4 className="text-xl font-medium tracking-tight ">Активность</h4>
				</div>
				<Button
					className="w-full justify-start px-2 font-mono text-muted-foreground"
					variant="ghost"
					asChild
				>
					<Link
						to="/dashboard/lots"
						activeProps={{
							className: "bg-accent text-white",
						}}
					>
						<SquareKanban className="mr-2" />
						Лоты
					</Link>
				</Button>
				<Button
					className="w-full justify-start px-2 font-mono text-muted-foreground"
					variant="ghost"
				>
					<Inbox className="mr-2" />
					Лента
				</Button>
				<div className="flex justify-between items-center mt-4">
					<h4 className="text-base font-medium tracking-tight ">Категории</h4>
					<Button size={"icon"} variant="ghost">
						<Plus className="w-4 h-4 " />
					</Button>
				</div>
				<div className="mt-2">
					{boards.map((board) => (
						<Button
							key={board.id}
							className="w-full justify-start px-1 text-muted-foreground font-mono"
							variant="ghost"
							asChild
						>
							<Link
								to="/dashboard/feed/$boardId"
								params={{ boardId: board.id }}
								activeProps={{
									className: "bg-accent text-white",
								}}
							>
								<Hash className="w-4 h-4 mr-2" />
								{board.name}
							</Link>
						</Button>
					))}
				</div>
			</div>
			<Outlet />
		</div>
	);
}

export function PendingComponent() {
	return (
		<div className="grid grid-cols-[56px_auto_80%]  min-h-screen max-w-screen w-full bg-muted/40">
			<Sidebar />

			<div className="bg-background border-r  w-full flex flex-col px-4">
				<div className="flex items-center h-16">
					<h4 className="text-xl font-medium tracking-tight ">Активность</h4>
				</div>
				<Button
					className="w-full justify-start px-2 font-mono text-muted-foreground"
					variant="ghost"
					asChild
				>
					<Link
						to="/dashboard/lots"
						activeProps={{
							className: "bg-accent text-white",
						}}
					>
						<SquareKanban className="mr-2" />
						Лоты
					</Link>
				</Button>
				<Button
					className="w-full justify-start px-2 font-mono text-muted-foreground"
					variant="ghost"
				>
					<Inbox className="mr-2" />
					Лента
				</Button>
				<div className="flex justify-between items-center mt-4">
					<h4 className="text-base font-medium tracking-tight ">Категории</h4>
					<Button size={"icon"} variant="ghost">
						<Plus className="w-4 h-4 " />
					</Button>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
