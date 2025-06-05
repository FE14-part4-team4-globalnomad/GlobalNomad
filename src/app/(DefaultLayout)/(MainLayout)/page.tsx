import { cn } from "@/utils/classNames";

function HomePage() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center flex-1 gap-[1.6rem] text-20-body-b",
        "tablet:flex-row",
      )}
    >
      <p>Hello,</p>
      <p className="p-[0.8rem] sm:pb-[20px] text-32-b text-brand-500">
        GlobalNomad
      </p>
    </div>
  );
}

export default HomePage;
