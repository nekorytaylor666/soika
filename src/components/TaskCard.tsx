import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import {
	Bot,
	ClockIcon,
	Currency,
	DollarSign,
	GripHorizontal,
	GripVertical,
	Package,
} from "lucide-react";
import { Badge } from "./ui/badge";
import type { ColumnId } from "./KanbanBoard";
import { Large } from "./ui/typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "@tanstack/react-router";
import { formatNumberWithCommas } from "@/lib/utils";

export interface Task {
	id: UniqueIdentifier;
	columnId: ColumnId;
	content: string;
	title: string;
	budget: number;
	deadline: Date;
	tenderId: string;
}

interface TaskCardProps {
	task: Task;
	isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
	type: TaskType;
	task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		} satisfies TaskDragData,
		attributes: {
			roleDescription: "Task",
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva("", {
		variants: {
			dragging: {
				over: "ring-2 ring-primary opacity-30",
				overlay: "ring-2 ring-primary",
			},
		},
	});

	return (
		<Card
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
			})}
		>
			<CardHeader className="px-4 pt-4 pb-0 space-between flex flex-row  items-center justify-between relative ">
				<Button variant={"link"} className="px-0 text-white">
					<Link to="/dashboard/$dealId" params={{ dealId: task.id as string }}>
						<Large>{task.title}</Large>
					</Link>
				</Button>
				<Button
					size={"icon"}
					variant={"ghost"}
					className="w-6 h-6"
					{...attributes}
					{...listeners}
				>
					<GripVertical className="w-5 h-5" />
				</Button>
			</CardHeader>
			<CardContent className="px-4 pb-4 text-left whitespace-pre-wrap">
				<p className="text-sm font-mono text-muted-foreground h-12">
					{task.content}
				</p>
				<div className="flex gap-2 mt-6">
					<div className="bg-secondary p-3 rounded-md w-1/2 flex justify-between items-center">
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs font-medium text-primary uppercase">
									Бюджет
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono">
									{formatNumberWithCommas(task.budget)}
									<span className="text-muted-foreground ml-1">₸</span>
								</div>
							</div>
						</div>
						<DollarSign className="w-5 h-5 text-muted-foreground" />
					</div>
					<div className="bg-secondary p-3   rounded-md w-1/2 flex justify-between  items-center">
						<div>
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xs font-medium text-primary uppercase">
									Подобрано
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono font">
									4
									<span className="text-sm text-muted-foreground ml-1">
										Продукта
									</span>
								</div>
							</div>
						</div>
						<Package className="w-5 h-5 text-muted-foreground" />
					</div>
				</div>
			</CardContent>
			<CardFooter className="px-3 pb-4 flex flex-row items-center justify-center">
				<ClockIcon className="text-muted-foreground w-4 h-4 mr-2" />
				<p className="text-sm text-muted-foreground">Прием заявок до</p>
			</CardFooter>
		</Card>
	);
}
