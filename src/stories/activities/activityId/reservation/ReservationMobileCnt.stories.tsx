import type { Meta, StoryObj } from '@storybook/nextjs';
import ReservationMobileCnt from '@/app/activties/[activityId]/components/reservation/ReservationMobileCnt';

const meta: Meta<typeof ReservationMobileCnt> = {
  title: 'Reservation/ReservationMobileCnt',
  component: ReservationMobileCnt,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReservationMobileCnt>;

export const Default: Story = {
  args: {
    pricePerPerson: 50000,
    initialGuestCount: 2,
    initialDate: new Date('2025-06-20'),
    availableDates: {
      '2025-06-20': ['10:00', '11:00', '14:00'],
      '2025-06-21': ['09:00', '13:00', '16:00'],
    },
  },
};
