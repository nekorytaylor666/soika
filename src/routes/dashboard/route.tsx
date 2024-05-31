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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
          <h4 className="text-base font-medium tracking-tight ">Доски</h4>
          <AddBoardPopover />
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
          <h4 className="text-base font-medium tracking-tight ">Доски</h4>
          <Button size={"icon"} variant="ghost">
            <Plus className="w-4 h-4 " />
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export function AddBoardPopover() {
  const { register, handleSubmit } = useForm<{ name: string }>();
  const [open, setOpen] = useState(false);
  const createBoard = trpc.board.create.useMutation();
  const utils = trpc.useUtils();
  const onSubmit = async (data: { name: string }) => {
    console.log(data);
    await createBoard.mutateAsync(data);
    utils.board.getAllByUser.invalidate();
    setOpen(false);
  };

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button size={"icon"} variant="ghost" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Добавить Доску</h4>
              <p className="text-sm text-muted-foreground">
                Добавить новую доску для ваших сделок.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="name">Название доски</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="col-span-2 h-8"
                />
              </div>
            </div>
            <Button variant="default" type="submit">
              {createBoard.isLoading ? "Добавляю..." : "Добавить"}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
