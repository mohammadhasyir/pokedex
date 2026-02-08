"use client";
import React, { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = [
  "https://picsum.photos/id/40/1200/350",
  "https://picsum.photos/id/237/1200/350",
  "https://picsum.photos/id/200/1200/350",
];

const CarouselImage = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem className="relative h-[350px]" key={index}>
              <Image alt="placeholder_image" fill={true} src={img} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default CarouselImage;
