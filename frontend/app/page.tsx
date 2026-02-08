import CarouselImage from "@/components/common/CarouselImage";
import PokemonList from "@/components/common/PokemonList";
import StaticBanner from "@/components/common/StaticBanner";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center font-sans">
      <main className="flex min-h-screen w-full mx-10 flex-col gap-5 p-12 sm:items-start">
        {/* ---Top section---- */}
        <div className="flex w-full gap-5">
          {/*---Carousel--- */}
          <div className="w-full">
            <CarouselImage />
          </div>
          {/* ---Static Banner--- */}
          <div className="flex flex-col gap-2">
            <div>
              <StaticBanner src="https://picsum.photos/id/219/1200/350" />
            </div>
            <div>
              <StaticBanner src="https://picsum.photos/id/244/1200/350" />
            </div>
          </div>
        </div>
        {/*---Middle section----  */}
        <div className="flex gap-5 w-full">
          {/* ---Static Image Left--- */}
          <div className="relative sticky top-2 h-64 w-48">
            <Image
              alt="static_image"
              fill={true}
              src="https://picsum.photos/id/275/1200/500"
            />
          </div>
          <div className="grow">
            <PokemonList />
          </div>
          {/* ------Static Image Right--- */}
          <div className="relative sticky top-0 h-64 w-128">
            <Image
              alt="static_image"
              fill={true}
              src="https://picsum.photos/id/258/1200/500"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
