import Image from "next/image";
import React from "react";

const StaticBanner = ({ src }: { src: string }) => {
  return (
    <div className="relative h-[170px] w-128">
      <Image alt="static_banner" src={src} fill={true} />
    </div>
  );
};

export default StaticBanner;
