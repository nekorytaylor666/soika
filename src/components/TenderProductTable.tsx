import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import { Link } from "@tanstack/react-router";

export function TenderProductTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">img</span>
					</TableHead>
					<TableHead>Название</TableHead>
					<TableHead>Цена</TableHead>
					<TableHead>Рейтинг</TableHead>
					<TableHead>
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TenderProductRow />
				<TenderProductRow />
				<TenderProductRow />
			</TableBody>
		</Table>
	);
}

const TenderProductRow = () => {
	return (
		<TableRow>
			<TableCell className="hidden sm:table-cell">
				<img
					alt="Product img"
					className="aspect-square rounded-md object-cover"
					height="64"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
					width="64"
				/>
			</TableCell>
			<TableCell className="font-medium">Laser Lemonade Machine</TableCell>
			<TableCell>$499.99</TableCell>
			<TableCell>
				<div className="flex flex-col items-center gap-2 justify-center">
					<span className="text-sm font-medium">8/10</span>
					<Progress max={10} value={80} />
				</div>
			</TableCell>
			<TableCell>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Действия</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link
								to="/dashboard/candidate/$tenderId/$candidateId"
								params={{
									tenderId: "1",
									candidateId: "1",
								}}
							>
								Посмотреть
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Удалить</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default TenderProductRow;
