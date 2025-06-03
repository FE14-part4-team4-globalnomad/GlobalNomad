import Image from "next/image";

import FacebookIcon from "@/assets/image/icons/socialicon/icon_facebook.svg";
import InstagramIcon from "@/assets/image/icons/socialicon/icon_instagram.svg";
import XIcon from "@/assets/image/icons/socialicon/icon_X.svg";
import YoutubeIcon from "@/assets/image/icons/socialicon/icon_youtube.svg";

const socialIcons = [
  { href: "https://www.facebook.com/", src: FacebookIcon, alt: "Facebook" },
  { href: "https://www.instagram.com/", src: InstagramIcon, alt: "Instagram" },
  { href: "https://www.youtube.com/", src: YoutubeIcon, alt: "YouTube" },
  { href: "https://x.com/", src: XIcon, alt: "X" },
];

export default function Footer() {
  return (
    <footer className="w-full my-5 bg-white text-[13px] text-[color:var(--gray-400)]">
      <div
        className="
          w-[90%] mx-auto
          grid grid-cols-3 grid-rows-2
          sm:grid-rows-1 sm:grid-cols-3
          items-center gap-2
          text-center sm:text-left
        "
      >
        <div
          className="
            row-start-1 col-span-3
            flex justify-center gap-2
            sm:col-span-1 sm:col-start-2 sm:row-start-1
          "
        >
          <a href="#" className="text-[color:var(--gray-600)]">
            Privacy Policy
          </a>
          <span>·</span>
          <a href="#" className="text-[color:var(--gray-600)]">
            FAQ
          </a>
        </div>

        <div
          className="
            row-start-2 col-start-1
            flex justify-start
            sm:row-start-1 sm:col-start-1
          "
        >
          <span>©codeit - 2023</span>
        </div>

        <div
          className="
            row-start-2 col-start-3
            flex justify-end gap-1
            sm:row-start-1 sm:col-start-3
          "
        >
          {socialIcons.map(({ href, src, alt }) => (
            <a href={href} key={alt}>
              <Image
                src={src}
                alt={alt}
                className="w-[2rem] h-[2rem] filter grayscale brightness-75 opacity-70 sm:filter-none sm:brightness-100 sm:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
