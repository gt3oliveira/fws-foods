import { Header } from "./_components/header";
import { Search } from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="flex w-full items-center p-8 text-2xl">
        Home Page - FullStack Week Four
      </div>
    </>
  );
}
