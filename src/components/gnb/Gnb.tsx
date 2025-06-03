import Image from "next/image";
import Link from "next/link";

import GnbUserSection from "./GnbUserSection";
import Earth from "@/assets/images/logos/logo_earth.svg";
import LogoEarth from "@/assets/images/logos/logo_globalnomad_md.svg";

function Gnb() {
  const isLoggedIn = true;
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent px-[2.4rem] tablet:px-[3rem] desktop:px-[20rem] h-[8rem] flex justify-between items-center z-9999">
      <div>
        <Link href="/">
          {/* 데스크탑용 로고 (기본) */}
          <Image
            src={LogoEarth}
            alt="로고"
            width={174}
            height={28}
            className="hidden tablet:block"
          />

          {/* 모바일용 로고 */}
          <Image
            src={Earth}
            alt="모바일 로고"
            width={28}
            height={28}
            className="block tablet:hidden"
          />
        </Link>
      </div>
      {isLoggedIn ? (
        <GnbUserSection />
      ) : (
        <div className="text-14-m flex gap-[3.9rem]">
          <Link href="/">로그인</Link>
          <Link href="/">회원가입</Link>
        </div>
      )}
    </nav>
  );
}

export default Gnb;
