'use client'

import { useState } from 'react';
import ReservationMobileCnt from './ReservationMobileCnt';
import ReservationMobile from './ReservationMobile';

type ReservationProps = {
  pricePerPerson: number;
  initialGuestCount?: number;
  initialDate?: Date;
  availableDates: Record<string, string[]>;
};

export default function ReservationFlow(props: ReservationProps) {
  const [step, setStep] = useState<'guest' | 'date'>('guest');

  return step === 'guest' ? (
    <ReservationMobileCnt {...props} onNext={() => setStep('date')} />
  ) : (
    <ReservationMobile {...props} onBack={() => setStep('guest')} />
  );
}