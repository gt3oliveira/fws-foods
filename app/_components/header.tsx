"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import {
  HeartIcon,
  HomeIcon,
  ListChecks,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function Header() {
  const { data, status } = useSession();

  const handleSingOutClick = () => signOut();
  const handleSingInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href={"/"} className="relative h-[30px] w-[100px]">
        <Image
          src="/logo.png"
          alt="FSW Foods"
          fill
          className="object-cover"
          quality={100}
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size={"icon"}
            variant={"outline"}
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" ? (
            <div className="flex items-center gap-3 pt-6">
              <Avatar>
                <AvatarImage
                  src={data.user?.image as string}
                  alt={data.user?.name as string}
                />
                <AvatarFallback>
                  {data.user?.name?.split(" ")[0][0]}
                  {data.user?.name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-semibold">{data.user?.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data.user?.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Faça seu login!</h2>
              <Button size={"icon"} onClick={handleSingInClick}>
                <LogInIcon size={20} />
              </Button>
            </div>
          )}

          <Separator className="my-6" />

          <div className="space-y-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <ListChecks size={16} />
                  <span className="block">Meus Pedidos</span>
                </Button>

                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>

          {data?.user && (
            <>
              <Separator className="my-6" />

              <Button
                variant={"ghost"}
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                onClick={handleSingOutClick}
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
