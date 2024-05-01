import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
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
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
