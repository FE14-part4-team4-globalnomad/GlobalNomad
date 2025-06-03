"use client";

import { useUser, withAuth } from "@/hooks/useAuth";

function Home() {
  const user = useUser();
  return (
    <div className="flex flex-row sm:flex-col items-center justify-center gap-[16px] min-h-screen text-20-body-b">
      <div>Hello, {user?.nickname || "-"}</div>
      <div className="p-[0.8rem] sm:pb-[20px] text-32-b text-brand-500">
        GlobalNomad
      </div>
    </div>
  );
}
export default withAuth(Home);
