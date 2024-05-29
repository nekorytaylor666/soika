import TenderProductTable from "@/components/TenderProductTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import customNode from "@/components/ui/custom-node";
import {
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { H4, Large } from "@/components/ui/typography";
import "reactflow/dist/style.css";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
	ArrowLeft,
	Bird,
	Book,
	Bot,
	Code2,
	LifeBuoy,
	Rabbit,
	Settings,
	Settings2,
	Share,
	SquareTerminal,
	SquareUser,
	Triangle,
	Turtle,
} from "lucide-react";
import { useCallback } from "react";
import ReactFlow, {
	Controls,
	Background,
	BackgroundVariant,
	useEdgesState,
	useNodesState,
	type Connection,
	type Edge,
	addEdge,
} from "reactflow";
import { Drawer } from "vaul";
import { Progress } from "@/components/ui/progress";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { z } from "zod";
import { formatNumberWithCommas } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/candidate/$recommendedId")({
	component: ProductCandidatePage,
	parseParams: (params) => ({
		recommendedId: z.string().parse(params.recommendedId),
	}),
});
const nodeTypes = {
	custom: customNode,
};
const initNodes = [
	{
		id: "1",
		type: "custom",
		data: {
			name: "Анализ технической спецификации",
			job: "CEO",
			emoji: "😎",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Наименование лота
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">Холодильник</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание лота
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								трёхкамерный, отдельностоящий, объем 400-449 л, с морозильным
								отделом
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Дополнительное описание
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь, Общий объем морозильной камеры -420 литров,
								Тип морозильник-ларь, Тип управления электронное, Размораживание
								морозильной камеры ручное, Мощность замораживания 35.0 кг/сут,
								Автономное сохранение холода17.0 ч, Хладагент R600a,
								Климатический класс SN, Инверторный тип компрессора Нет, Класс
								энергопотребления B, Высота81.0 см, Ширина150.0 см, Глубина 66.5
								см, Доставка и разгрузка за счет Поставщика
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 400, y: -500 },
	},
	{
		id: "2",
		type: "custom",
		data: {
			name: "Умный ИИ поиск",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Поисковый запрос
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								трехкамерный холодильник 450 л морозильный ларь
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 400, y: 0 },
	},
	{
		id: "3",
		type: "custom",
		data: {
			name: "Сайт 1",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Заголовок
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Купить Морозильник HIBERG PF 42L2GW на официальном сайте,
								интернет-магазина HIBERG
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильник HIBERG PF 42L2GW с ручной системой оттаивания в
								белом цвете
							</div>
						</div>
					</div>
					<Button asChild className="w-full" variant={"outline"}>
						<a
							href="https://hiberg.ru/katalog/morozilnye-kamery/morozilnik-hiberg-pf-42l2gw/"
							target="_blank"
							rel="noreferrer"
						>
							Посмотреть
						</a>
					</Button>
				</div>
			),
		},
		position: { x: 0, y: 400 },
	},
	{
		id: "4",
		type: "custom",
		data: {
			name: "Экстракция информации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Наименование продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW предназначен для эффективного
								замораживания и длительного хранения большого объема продуктов.
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Спецификации
							</CardTitle>
						</div>
						<div>
							<div className=" text-xs font-mono  list-disc">
								<ul>
									<li>Общий объем камеры: 420 л</li>
									<li>Класс энергоэффективности: А</li>
									<li>Энергопотребление: 365 кВт/год</li>
									<li>Хладагент: R600a</li>
									<li>Климатический класс: ST</li>
									<li>Вспениватель теплоизоляции: Cyclopentane</li>
									<li>Размораживание морозильной камеры: ручное</li>
									<li>Температурный режим: -12°C до -24°C</li>
									<li>Мощность замораживания: 24 кг/сутки</li>
									<li>Встроенный замок: есть</li>
									<li>Количество корзин: 2 шт</li>
									<li>Ножки/колесики: 2/2 шт</li>
									<li>Лампа подсветки: есть</li>
									<li>Уровень шума: 44 дБ</li>
									<li>Ширина: 113 см</li>
									<li>Глубина: 71.5 см</li>
									<li>Высота: 85 см</li>
									<li>Цвет: Белый</li>
									<li>Вес НЕТТО: 50 кг</li>
									<li>Производитель: Hiberg</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 0, y: 800 },
	},
	{
		id: "5",
		type: "custom",
		data: {
			name: "Соответствие спецификации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Рейтинг соответствия
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">8</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Комментарии Сойки
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Продукт 'Морозильный ларь Hiberg PF 42 L2GW' имеет общий объем
								камеры 420 л, что соответствует указанному в спецификациях лота
								объему 420 литров. Класс энергоэффективности продукта А, в то
								время как в спецификациях лота указан класс B, что является
								несоответствием. Энергопотребление продукта составляет 365
								кВт/год, в то время как в спецификациях лота не указано значение
								энергопотребления. Хладагент R600a и климатический класс ST
								продукта соответствуют указанным в спецификациях лота. Мощность
								замораживания продукта 24 кг/сутки, что меньше, чем указано в
								спецификациях лота (35.0 кг/сут). Размеры продукта (ширина 113
								см, глубина 71.5 см, высота 85 см) отличаются от размеров,
								указанных в спецификациях лота (ширина 150.0 см, глубина 66.5
								см, высота 81.0 см).
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 0, y: 1500 },
	},
	{
		id: "6",
		type: "custom",
		data: {
			name: "Сайт 2",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Заголовок
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Купить Морозильник HIBERG PF 42L2GW на официальном сайте,
								интернет-магазина HIBERG
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильник HIBERG PF 42L2GW с ручной системой оттаивания в
								белом цвете
							</div>
						</div>
					</div>
					<Button asChild className="w-full" variant={"outline"}>
						<a
							href="https://hiberg.ru/katalog/morozilnye-kamery/morozilnik-hiberg-pf-42l2gw/"
							target="_blank"
							rel="noreferrer"
						>
							Посмотреть
						</a>
					</Button>
				</div>
			),
		},
		position: { x: 400, y: 400 },
	},
	{
		id: "7",
		type: "custom",
		data: {
			name: "Экстракция информации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Наименование продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW предназначен для эффективного
								замораживания и длительного хранения большого объема продуктов.
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Спецификации
							</CardTitle>
						</div>
						<div>
							<div className=" text-xs font-mono  list-disc">
								<ul>
									<li>Общий объем камеры: 420 л</li>
									<li>Класс энергоэффективности: А</li>
									<li>Энергопотребление: 365 кВт/год</li>
									<li>Хладагент: R600a</li>
									<li>Климатический класс: ST</li>
									<li>Вспениватель теплоизоляции: Cyclopentane</li>
									<li>Размораживание морозильной камеры: ручное</li>
									<li>Температурный режим: -12°C до -24°C</li>
									<li>Мощность замораживания: 24 кг/сутки</li>
									<li>Встроенный замок: есть</li>
									<li>Количество корзин: 2 шт</li>
									<li>Ножки/колесики: 2/2 шт</li>
									<li>Лампа подсветки: есть</li>
									<li>Уровень шума: 44 дБ</li>
									<li>Ширина: 113 см</li>
									<li>Глубина: 71.5 см</li>
									<li>Высота: 85 см</li>
									<li>Цвет: Белый</li>
									<li>Вес НЕТТО: 50 кг</li>
									<li>Производитель: Hiberg</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 400, y: 800 },
	},
	{
		id: "8",
		type: "custom",
		data: {
			name: "Соответствие спецификации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Рейтинг соответствия
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">8</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Комментарии Сойки
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Продукт 'Морозильный ларь Hiberg PF 42 L2GW' имеет общий объем
								камеры 420 л, что соответствует указанному в спецификациях лота
								объему 420 литров. Класс энергоэффективности продукта А, в то
								время как в спецификациях лота указан класс B, что является
								несоответствием. Энергопотребление продукта составляет 365
								кВт/год, в то время как в спецификациях лота не указано значение
								энергопотребления. Хладагент R600a и климатический класс ST
								продукта соответствуют указанным в спецификациях лота. Мощность
								замораживания продукта 24 кг/сутки, что меньше, чем указано в
								спецификациях лота (35.0 кг/сут). Размеры продукта (ширина 113
								см, глубина 71.5 см, высота 85 см) отличаются от размеров,
								указанных в спецификациях лота (ширина 150.0 см, глубина 66.5
								см, высота 81.0 см).
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 400, y: 1500 },
	},
	{
		id: "9",
		type: "custom",
		data: {
			name: "Сайт 3",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Заголовок
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Купить Морозильник HIBERG PF 42L2GW на официальном сайте,
								интернет-магазина HIBERG
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильник HIBERG PF 42L2GW с ручной системой оттаивания в
								белом цвете
							</div>
						</div>
					</div>
					<Button asChild className="w-full" variant={"outline"}>
						<a
							href="https://hiberg.ru/katalog/morozilnye-kamery/morozilnik-hiberg-pf-42l2gw/"
							target="_blank"
							rel="noreferrer"
						>
							Посмотреть
						</a>
					</Button>
				</div>
			),
		},
		position: { x: 800, y: 400 },
	},
	{
		id: "10",
		type: "custom",
		data: {
			name: "Экстракция информации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Наименование продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Описание продукта
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Морозильный ларь Hiberg PF 42 L2GW предназначен для эффективного
								замораживания и длительного хранения большого объема продуктов.
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Спецификации
							</CardTitle>
						</div>
						<div>
							55555555
							<div className=" text-xs font-mono  list-disc">
								<ul>
									<li>Общий объем камеры: 420 л</li>
									<li>Класс энергоэффективности: А</li>
									<li>Энергопотребление: 365 кВт/год</li>
									<li>Хладагент: R600a</li>
									<li>Климатический класс: ST</li>
									<li>Вспениватель теплоизоляции: Cyclopentane</li>
									<li>Размораживание морозильной камеры: ручное</li>
									<li>Температурный режим: -12°C до -24°C</li>
									<li>Мощность замораживания: 24 кг/сутки</li>
									<li>Встроенный замок: есть</li>
									<li>Количество корзин: 2 шт</li>
									<li>Ножки/колесики: 2/2 шт</li>
									<li>Лампа подсветки: есть</li>
									<li>Уровень шума: 44 дБ</li>
									<li>Ширина: 113 см</li>
									<li>Глубина: 71.5 см</li>
									<li>Высота: 85 см</li>
									<li>Цвет: Белый</li>
									<li>Вес НЕТТО: 50 кг</li>
									<li>Производитель: Hiberg</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 800, y: 800 },
	},
	{
		id: "11",
		type: "custom",
		data: {
			name: "Соответствие спецификации",
			component: (
				<div className="flex flex-col gap-4 text-muted-foreground">
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Рейтинг соответствия
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">8</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex flex-row items-center justify-between space-y-0 pb-1">
							<CardTitle className="text-sm font-medium text-primary">
								Комментарии Сойки
							</CardTitle>
						</div>
						<div>
							<div className=" font-mono text-xs">
								Продукт 'Морозильный ларь Hiberg PF 42 L2GW' имеет общий объем
								камеры 420 л, что соответствует указанному в спецификациях лота
								объему 420 литров. Класс энергоэффективности продукта А, в то
								время как в спецификациях лота указан класс B, что является
								несоответствием. Энергопотребление продукта составляет 365
								кВт/год, в то время как в спецификациях лота не указано значение
								энергопотребления. Хладагент R600a и климатический класс ST
								продукта соответствуют указанным в спецификациях лота. Мощность
								замораживания продукта 24 кг/сутки, что меньше, чем указано в
								спецификациях лота (35.0 кг/сут). Размеры продукта (ширина 113
								см, глубина 71.5 см, высота 85 см) отличаются от размеров,
								указанных в спецификациях лота (ширина 150.0 см, глубина 66.5
								см, высота 81.0 см).
							</div>
						</div>
					</div>
				</div>
			),
		},
		position: { x: 800, y: 1500 },
	},
	{
		id: "12",
		type: "custom",
		data: { name: "Анализ результатов", job: "HR", emoji: "👥" },
		position: { x: 400, y: 2100 },
	},
];

const initEdges: Edge[] = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		animated: true,
	},
	{
		id: "e1-3",
		source: "2",
		target: "3",
		animated: true,
	},
	{
		id: "e1-4",
		source: "3",
		target: "4",
		animated: true,
	},
	{
		id: "e1-4",
		source: "4",
		target: "5",
		animated: true,
	},
	{
		id: "e1-5",
		source: "2",
		target: "6",
		animated: true,
	},
	{
		id: "e1-6",
		source: "6",
		target: "7",
		animated: true,
	},
	{
		id: "e1-6",
		source: "7",
		target: "8",
		animated: true,
	},
	{
		id: "e1-6",
		source: "2",
		target: "9",
		animated: true,
	},
	{
		id: "e1-6",
		source: "9",
		target: "10",
		animated: true,
	},
	{
		id: "e1-6",
		source: "10",
		target: "11",
		animated: true,
	},
	{
		id: "e1-6",
		source: "11",
		target: "12",
		animated: true,
	},
	{
		id: "e1-6",
		source: "8",
		target: "12",
		animated: true,
	},
	{
		id: "e1-6",
		source: "5",
		target: "12",
		animated: true,
	},
];
function ProductCandidatePage() {
	const { recommendedId } = Route.useParams();
	const [candidate] =
		trpc.recommendedProducts.getById.useSuspenseQuery(recommendedId);

	return (
		<main className="  flex-1 gap-4 overflow-auto  bg-background">
			<div
				className="relative hidden flex-col items-start md:flex "
				x-chunk="dashboard-03-chunk-0"
			>
				<div className="h-16 border-b flex justify-center items-center relative w-full">
					<Button
						onClick={() => history.back()}
						variant="ghost"
						size={"icon"}
						className="p-2 absolute left-4"
					>
						<ArrowLeft className="w-full" />
					</Button>

					<H4>Рекомендация для лота {candidate?.lotId}</H4>
				</div>
				<div className="container max-w-3xl">
					<div className="flex flex-col gap-4 pt-4">
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Название продукта
								</CardTitle>
							</div>
							<div>
								<Button
									asChild
									variant={"link"}
									className="text-lg font-mono px-0 text-muted-foreground"
								>
									<a
										target="_blank"
										rel="noreferrer"
										href={candidate?.sourceUrl ?? ""}
									>
										{candidate?.productName}
									</a>
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-2">
							<div className="w-full">
								<div className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-primary">
										Цена
									</CardTitle>
								</div>
								<div>
									<div className="text-lg font-mono">
										{formatNumberWithCommas(candidate?.price ?? 0)}{" "}
										{candidate?.currency}
									</div>
								</div>
							</div>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="w-full">
										<div className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium text-primary">
												Рейтинг
											</CardTitle>
										</div>
										<div className="flex gap-2 items-center">
											<div className="text-lg font-mono">
												{candidate?.complianceScore}/10
											</div>
											<Progress value={candidate?.complianceScore * 10} />
										</div>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>
										Насколько продукт соответствует технической Спецификации по
										мнению ИИ
									</p>
								</TooltipContent>
							</Tooltip>
						</div>
						<div className="w-full">
							<div className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-primary">
									Описание
								</CardTitle>
							</div>
							<div>
								<div className=" font-mono">
									{candidate?.productDescription}
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
									{candidate?.productSpecifications}
								</div>
							</div>
						</div>
						<Accordion type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger>Почему такой рейтинг?</AccordionTrigger>
								<AccordionContent className="font-mono">
									{candidate?.complianceDetails}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</div>
		</main>
	);
}

// <div className="bg-background w-full">
// 	<div className="h-16 border-b px-4 flex justify-center items-center relative">
// 		<Link to="/dashboard/feed" className="absolute left-4">
// 			<Button variant="ghost" size={"icon"} asChild className="p-2">
// 				<ArrowLeft className="w-full" />
// 			</Button>
// 		</Link>
// 		<H4>Предлагаемые продукты для тендера</H4>
// 	</div>
// 	<div className="container max-w-3xl  mt-4">
// 		<Card>
// 			<CardHeader>
// 				<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 			</CardHeader>
// 		</Card>
// 	</div>
// 	<div className="container max-w-3xl  mt-4 ">
// 		<Timeline>
// 			<TimelineItem>
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<p>
// 							Наименование лота: Холодильник Описание лота: трёхкамерный,
// 							отдельностоящий, объем 400-449 л, с морозильным отделом
// 							Дополнительное описание лота: 024 Морозильный ларь, Общий
// 							объем морозильной камеры -420 литров, Тип морозильник-ларь,
// 							Тип управления электронное, Размораживание морозильной камеры
// 							ручное, Мощность замораживания 35.0 кг/сут, Автономное
// 							сохранение холода17.0 ч, Хладагент R600a, Климатический класс
// 							SN, Инверторный тип компрессора Нет, Класс энергопотребления
// 							B, Высота81.0 см, Ширина150.0 см, Глубина 66.5 см, Доставка и
// 							разгрузка за счет Поставщика
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<p>
// 							Холодильник с морозильным ларем 420 литров ручное
// 							размораживание
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<p>
// 							url
// 							:http://ea.intermarket.kz/kholodilniki/f-450-l-a-morozilnik-lar--103305-4232-42394/
// 							title:titleКупить холодильник: Общий объем 450 л, Класс
// 							энергопотребления A++, Тип морозильник-ларь в интернет
// 							магазине Казахстана Intermarket.kz <br></br>
// 							keywords:Холодильники, Общий объем 450 л, Класс
// 							энергопотребления A++, Тип морозильник-ларь, интернет магазин,
// 							Intermarket.kz, цены, доставка, Казахстан, Алматы
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<p>
// 							Наименование продукта: Морозильный ларь Hiberg PF 42 L2GW
// 							Описание продукта: Морозильный ларь Hiberg PF 42 L2GW
// 							предназначен для эффективного замораживания и длительного
// 							хранения большого объема продуктов. Спецификации: * Общий
// 							объем камеры: 420 л * Класс энергоэффективности: А *
// 							Энергопотребление: 365 кВт/год * Хладагент: R600a *
// 							Климатический класс: ST * Вспениватель теплоизоляции:
// 							Cyclopentane * Размораживание морозильной камеры: ручное *
// 							Температурный режим: -12°C до -24°C * Мощность замораживания:
// 							24 кг/сутки * Встроенный замок: есть * Количество корзин: 2 шт
// 							* Ножки/колесики: 2/2 шт * Лампа подсветки: есть * Уровень
// 							шума: 44 дБ * Ширина: 113 см * Глубина: 71.5 см * Высота: 85
// 							см * Цвет: Белый * Вес НЕТТО: 50 кг * Производитель: Hiberg
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</TimelineItem>
// 			<TimelineItem>
// 				<Card>
// 					<CardHeader>
// 						<CardTitle>Предлагаемые продукты для тендера</CardTitle>
// 					</CardHeader>
// 					<CardContent>
// 						<p>
// 							"compliance_details":"Продукт \'Морозильный ларь Hiberg PF 42
// 							L2GW\' имеет общий объем камеры 420 л, что соответствует
// 							указанному в спецификациях лота объему 420 литров. Класс
// 							энергоэффективности продукта А, в то время как в спецификациях
// 							лота указан класс B, что является несоответствием.
// 							Энергопотребление продукта составляет 365 кВт/год, в то время
// 							как в спецификациях лота не указано значение
// 							энергопотребления. Хладагент R600a и климатический класс ST
// 							продукта соответствуют указанным в спецификациях лота.
// 							Мощность замораживания продукта 24 кг/сутки, что меньше, чем
// 							указано в спецификациях лота (35.0 кг/сут). Размеры продукта
// 							(ширина 113 см, глубина 71.5 см, высота 85 см) отличаются от
// 							размеров, указанных в спецификациях лота (ширина 150.0 см,
// 							глубина 66.5 см, высота 81.0
// 							см).","compliance_score":5,"fully_compliant":false
// 						</p>
// 					</CardContent>
// 				</Card>
// 			</TimelineItem>
// 		</Timeline>
// 	</div>
// </div>
