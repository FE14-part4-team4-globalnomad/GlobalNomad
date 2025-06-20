"use client";

import { useState } from "react";

import ReservationMobile from "./ReservationMobile";
import ReservationMobileCnt from "./ReservationMobileCnt";

type ReservationProps = {
  pricePerPerson: number;
  activityId: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
};

export default function ReservationFlow(props: ReservationProps) {
  const [step, setStep] = useState<"guest" | "date">("guest");

  return (
    <div className="w-full h-full overflow-y-auto p-[24px] rounded-t-3xl bg-white">
      {step === "guest" ? (
        <ReservationMobileCnt
          {...props}
          onBack={() => setStep("date")}
          onConfirm={() => {}}
        />
      ) : (
        <ReservationMobile {...props} onNext={() => setStep("guest")} />
      )}
    </div>
  );
}
