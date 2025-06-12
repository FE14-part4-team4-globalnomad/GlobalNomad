import type { Meta, StoryObj } from '@storybook/nextjs';

import ReservationMobile from '@/components/activities/activityId/reservation/ReservationMobile';

const meta: Meta<typeof ReservationMobile> = {
  title: 'Reservation/ReservationMobile',
  component: ReservationMobile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReservationMobile>;

export const Default: Story = {
  args: {
    pricePerPerson: 50000,
    initialGuestCount: 2,
    initialDate: new Date('2022-11-14'),
    availableDates: {
      '2022-11-20': ['10:00', '11:00', '14:00'],
      '2022-11-21': ['09:00', '13:00', '16:00'],
      '2022-11-22': ['10:00', '12:00'],
    },
  },
};