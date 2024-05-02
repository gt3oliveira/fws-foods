"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search) return;
    router.push(`/restaurants?search=${search}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes"
        className="border-none bg-gray-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button size={"icon"} type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
}
