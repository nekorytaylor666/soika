import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useTrpc } from "@/hooks/useTrpc";

export const Route = createFileRoute("/login")({
	component: LoginForm,
});

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const onSubmit = async (values: any) => {
		setIsLoading(true);
		const { data, error } = await supabase.auth.signInWithOtp({
			email: values.email,
			options: {
				// установите это значение в false, если не хотите, чтобы пользователь автоматически регистрировался
				shouldCreateUser: false,
			},
		});

		setIsLoading(false);
		navigate({
			to: "/verifyOtp",
			search: {
				email: values.email,
			},
		});

		console.log(data);
		// Выполните логику входа здесь
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex h-screen items-center justify-center">
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Вход</CardTitle>
						<CardDescription>
							Введите свой email ниже, чтобы войти в свой аккаунт
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									{...register("email")}
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>

							<Button type="submit" className="w-full">
								{isLoading ? (
									<LoaderCircle className="animate-spin" />
								) : (
									"Войти"
								)}
							</Button>
							<Button variant="outline" className="w-full">
								Войти с Google
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Нет аккаунта?{" "}
							<Link href="#" className="underline">
								Зарегистрироваться
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</form>
	);
}
