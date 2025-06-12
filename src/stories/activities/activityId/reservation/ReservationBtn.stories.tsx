import type { Meta, StoryObj } from '@storybook/nextjs';

import ReservationBtn from '@/components/activities/activityId/reservation/ReservationBtn';

const meta: Meta<typeof ReservationBtn> = {
  title: 'Reservation/ReservationBtn',
  component: ReservationBtn,
  tags: ['autodocs'],
  argTypes: {
    onReserve: { action: 'reserve-clicked' },
    pricePerPerson: {
      control: { type: 'number' },
      description: '1인당 가격',
    },
    isReady: {
      control: { type: 'boolean' },
      description: '예약 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReservationBtn>;

export const Default: Story = {
  args: {
    pricePerPerson: 30000,
    isReady: false,
  },
};

export const ReadyToReserve: Story = {
  args: {
    pricePerPerson: 45000,
    isReady: true,
  },
};

export const NotReady: Story = {
  args: {
    pricePerPerson: 25000,
    isReady: false,
  },
};
