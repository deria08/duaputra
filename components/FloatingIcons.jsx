"use client";
import Image from "next/image";
import { assets } from "@/assets/assets";

const icons = [
  { src: assets.fish, size: 60, top: "10%", left: "20%", delay: "0s" },
  { src: assets.shrimp, size: 70, top: "30%", left: "70%", delay: "2s" },
  { src: assets.squid, size: 80, top: "60%", left: "40%", delay: "4s" },
//   { src: assets.ikan, size: 50, top: "80%", left: "15%", delay: "1s" },
];

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: icon.delay,
          }}
        >
          <Image
            src={icon.src}
            alt="floating icon"
            width={icon.size}
            height={icon.size}
            className="opacity-40"
          />
        </div>
      ))}
    </div>
  );
}
