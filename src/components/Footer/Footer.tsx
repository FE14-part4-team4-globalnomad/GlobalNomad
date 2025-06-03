import Image from "next/image";

import FacebookIcon from "@/assets/image/icons/socialicon/icon_facebook.svg";
import InstagramIcon from "@/assets/image/icons/socialicon/icon_instagram.svg";
import XIcon from "@/assets/image/icons/socialicon/icon_X.svg";
import YoutubeIcon from "@/assets/image/icons/socialicon/icon_youtube.svg";

export default function Footer() {
  return (
    <footer className="w-full my-5 bg-white text-[13px] text-[color:var(--gray-400)]">
      <div className="w-[90%] mx-auto flex justify-between items-center gap-3">
        <div className="flex-shrink-0">©codeit - 2023</div>
        <div className="flex gap-2">
          <a href="#" className="text-[color:var(--gray-400)]">
            Privacy Policy
          </a>
          <span>·</span>
          <a href="#" className="text-[color:var(--gray-400)]">
            FAQ
          </a>
        </div>
        <div className="flex gap-1">
          <a href="https://www.facebook.com/">
            <Image
              src={FacebookIcon}
              alt="Facebook"
              className="w-[2rem] h-[2rem]"
            />
          </a>
          <a href="https://www.instagram.com/">
            <Image
              src={InstagramIcon}
              alt="Instagram"
              className="w-[2rem] h-[2rem]"
            />
          </a>
          <a href="https://www.youtube.com/">
            <Image
              src={YoutubeIcon}
              alt="YouTube"
              className="w-[2rem] h-[2rem]"
            />
          </a>
          <a href="https://x.com/">
            <Image src={XIcon} alt="X" className="w-[2rem] h-[2rem]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
