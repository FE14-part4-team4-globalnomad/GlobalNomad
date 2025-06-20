import Image from "next/image";
import Link from "next/link";

import LogoEarth from "@/assets/images/logos/logo_earth.svg?url";
import LogoGlobalNomad from "@/assets/images/logos/logo_globalnomad_lg.svg?url";

export default function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={LogoGlobalNomad}
          alt="GlobalNomad 로고"
          width={255}
          height={199}
          className="hidden tablet:block"
        />

        <Image
          src={LogoEarth}
          alt="GlobalNomad 모바일 로고"
          width={144}
          height={144}
          className="block tablet:hidden"
        />
      </Link>
    </div>
  );
}
