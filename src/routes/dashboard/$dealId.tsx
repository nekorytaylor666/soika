import TenderMainInfo from "@/components/TenderMainInfo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { H4 } from "@/components/ui/typography";
import { formatNumberWithCommas } from "@/lib/utils";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

import { TenderProductTable } from "@/components/TenderProductTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import type { Lot } from "../../../../backend/src/db/schema";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard/$dealId")({
	parseParams: (params) => ({
		dealId: z.string().parse(params.dealId),
	}),
	pendingComponent: TenderSkeleton,

	component: () => <TenderPage />,
});

function TenderPage() {
	const { dealId } = Route.useParams();
	const [res] = trpc.deal.getById.useSuspenseQuery(dealId);
	console.log(res);
	const { history } = useRouter();
	return (
		<div className="bg-background w-full">
			<div className="h-16 border-b px-4 flex justify-center items-center relative">
				<Button
					onClick={() => history.back()}
					variant="ghost"
					size={"icon"}
					className="p-2 absolute left-4"
				>
					<ArrowLeft className="w-full" />
				</Button>

				<H4>Детали объявления</H4>
			</div>
			<div className="container lg:max-w-3xl mt-4">
				<div>
					<TenderMainInfo
						tenderName={res.lot?.lotName}
						tenderStatus="Опубликовано (прием ценовых предложений)"
						totalCost={`KZT ${formatNumberWithCommas(res.lot?.budget)}`}
						deadline="2023-12-31"
						tenderNumber={res.lot?.lotNumber}
					/>
				</div>
				<Tabs defaultValue="details" className="w-full mt-4">
					<TabsList className="mb-2">
						<TabsTrigger value="details">Детали объявления</TabsTrigger>
						<TabsTrigger value="candidates">Предложения от ИИ</TabsTrigger>
					</TabsList>
					<TabsContent value="candidates">
						<Card>
							<CardHeader>
								<CardTitle>
									<Link
										to="/dashboard/products/$tenderId"
										params={{ tenderId: "1" }}
									>
										<Button className="px-0 text-lg" variant="link">
											Варианты продуктов
										</Button>
									</Link>
								</CardTitle>
								<CardDescription>
									Варианты продуктов, которые подходят под технические
									спецификации
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TenderProductTable />
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="details">
						<TenderDetails data={res.lot} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

function TenderDetails({ data }: { data: Lot }) {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Детали объявления</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Наименование лота
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  ">{data.lotName}</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Описание
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  ">{data.lotDescription}</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Кол-во
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  ">
									{data.quantity} {data.unitOfMeasure}
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Спецификации
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  list-disc [&>li]:mt-2">
									<ul>{data.lotAdditionalDescription}</ul>
								</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Адрес поставки
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  ">{data.deliveryPlaces}</div>
							</div>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Срок поставки
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono  ">{data.deliveryTerm}</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function TenderSkeleton() {
	return (
		<div className="bg-background w-full">
			<div className="h-16 border-b px-4 flex justify-center items-center relative">
				<Button
					onClick={() => history.back()}
					variant="ghost"
					size={"icon"}
					className="p-2 absolute left-4"
				>
					<ArrowLeft className="w-full" />
				</Button>

				<H4>Детали объявления</H4>
			</div>
			<div className="container lg:max-w-3xl mt-4">
				<div>
					<Skeleton className="w-full h-40 rounded-lg" />
				</div>
				<Tabs defaultValue="details" className="w-full mt-4">
					<TabsList className="mb-2">
						<TabsTrigger value="details">Детали объявления</TabsTrigger>
						<TabsTrigger value="candidates">Предложения от ИИ</TabsTrigger>
					</TabsList>
					<TabsContent value="candidates">
						<Skeleton className="w-full h-[1000px] rounded-lg" />
					</TabsContent>
					<TabsContent value="details">
						<Skeleton className="w-full h-[1000px] rounded-lg" />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
