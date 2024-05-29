import { H4, Large, Lead, P } from "@/components/ui/typography";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoreHorizontal, Package } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { toast } from "sonner";
import { formatNumberWithCommas } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AddTenderDialog } from "@/components/addTenderDialog";

export const Route = createFileRoute("/dashboard/lots")({
  component: () => <LotsPage />,
  pendingComponent: LoadingLotsPage,
});

function LotsPage() {
  const [lots] = trpc.lot.getAllWithRecommendations.useSuspenseQuery();
  const [boards] = trpc.board.getAllByUser.useSuspenseQuery();
  const addToDealBoardMutation = trpc.lot.addToDealBoard.useMutation();
  const navigation = useNavigate();
  const utils = trpc.useUtils();
  const onAddToDealBoard = (lotId: string, boardId: string) => {
    addToDealBoardMutation.mutate(
      { lotId, boardId },
      {
        onSuccess: () => {
          toast("Лот добавлен в доску", {
            action: {
              label: "К доске",
              onClick: () => {
                navigation({
                  to: "/dashboard/feed/$boardId",
                  params: { boardId },
                });
              },
            },
          });
          utils.board.getById.invalidate();
        },
      },
    );
  };
  return (
    <div className="w-full bg-background">
      <div className="flex h-16 items-center justify-start border-b px-4">
        <H4>Лоты, которые мы подобрали</H4>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container mt-4 flex flex-col gap-4 lg:max-w-2xl">
          <AddTenderDialog />
          {lots.map((lot) => (
            <div
              className="flex flex-col gap-2 border-b pb-4"
              key={lot.lotNumber}
            >
              <div className="flex items-center justify-between">
                <Large className="cursor-pointer text-primary hover:underline">
                  {lot.lotName}
                </Large>
                <Lead className="font-mono text-base text-white">
                  {formatNumberWithCommas(lot.budget ?? 0)} KZT
                </Lead>
              </div>
              <P className="font-mono text-muted-foreground text-sm lowercase">
                {lot.lotDescription} {lot.lotAdditionalDescription}
              </P>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="size-4" />
                  <P>{lot.recommendedProducts.length} Товар</P>
                </div>
                <Menubar className="border-none">
                  <MenubarMenu>
                    <MenubarTrigger className="cursor-pointer hover:bg-muted">
                      <MoreHorizontal className="size-4" />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem asChild>
                        <Link
                          to="/dashboard/lot/$lotId"
                          params={{ lotId: lot.lotNumber }}
                        >
                          Перейти к лоту <MenubarShortcut>⌘T</MenubarShortcut>
                        </Link>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Добавить в доску</MenubarSubTrigger>
                        <MenubarSubContent>
                          {boards.map((board) => (
                            <MenubarItem
                              key={board.id}
                              onClick={() =>
                                onAddToDealBoard(lot.lotNumber, board.id)
                              }
                            >
                              # {board.name}
                            </MenubarItem>
                          ))}
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function LoadingLotsPage() {
  return (
    <div className="w-full bg-background">
      <div className="flex h-16 items-center justify-start border-b px-4">
        <H4>Лоты, которые мы подобрали</H4>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container mt-4 flex flex-col gap-4 lg:max-w-2xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <Skeleton className="h-28 w-full" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
