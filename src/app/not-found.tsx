import { cn } from "@/utils/classNames";

function NotFoundPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <header className={cn("h-[4.8rem]", "tablet:h-[8rem]")}>헤더</header>
      <main className="flex flex-col flex-1">404 에러 페이지</main>
      <footer className="h-[14rem]">푸터</footer>
    </div>
  );
}

export default NotFoundPage;
