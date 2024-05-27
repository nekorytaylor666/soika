import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Home,
	ShoppingCart,
	Package,
	Users2,
	LineChart,
	Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { supabase } from "@/lib/supabase";
import { redirect } from "@tanstack/react-router";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

function Sidebar() {
	const onLogout = async () => {
		await supabase.auth.signOut();
		redirect({ to: "/login" });
	};
	return (
		<aside className=" z-10 hidden w-14 flex-col border-r h-screen bg-background sm:flex">
			<div className="h-16 flex items-center justify-center  px-2">
				<Avatar className="w-9 h-9">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			<hr className="h-px  border-border mx-3" />
			<nav className="flex flex-col items-center gap-4 px-2 pt-4">
				{/* Navigation Links */}
				<NavItem icon={<Home />} label="Dashboard" />
				<NavItem icon={<ShoppingCart />} label="Orders" />
				<NavItem icon={<Package />} label="Products" />
				<NavItem icon={<Users2 />} label="Customers" />
				<NavItem icon={<LineChart />} label="Analytics" />
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
				<Popover>
					<PopoverTrigger>
						<NavItem icon={<Settings />} label="Settings" />
					</PopoverTrigger>
					<PopoverContent>
						<Button onClick={onLogout}>Logout</Button>
					</PopoverContent>
				</Popover>
			</nav>
		</aside>
	);
}

function NavItem({ icon, label }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<a
					href="#"
					className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				>
					{icon}
					<span className="sr-only">{label}</span>
				</a>
			</TooltipTrigger>
			<TooltipContent side="right">{label}</TooltipContent>
		</Tooltip>
	);
}

export default Sidebar;
