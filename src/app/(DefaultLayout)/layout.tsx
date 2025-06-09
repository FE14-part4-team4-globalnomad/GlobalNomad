import { ReactNode } from "react";

import Footer from "@/components/footer/Footer";
import Gnb from "@/components/gnb/Gnb";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Gnb />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
