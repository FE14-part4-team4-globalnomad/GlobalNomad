import type { Meta, StoryObj } from '@storybook/nextjs';

import Reservation from '@/components/activities/activityId/reservation/Reservation';

const meta: Meta<typeof Reservation> = {
  title: 'Components/Reservation',
  component: Reservation,
  tags: ['autodocs'],
  argTypes: {
    pricePerPerson: { control: { type: 'number' } },
    initialGuestCount: { control: { type: 'number' } },
    initialDate: { control: { type: 'date' } },
    availableDates: { control: { type: 'object' } },
  },
};

export default meta;

type Story = StoryObj<typeof Reservation>;

export const Default: Story = {
  args: {
    pricePerPerson: 1000,
    initialGuestCount: 10,
    initialDate: new Date('2022-11-14'),
    availableDates: {
      '2022-11-14': ['14:00~15:00', '15:00~16:00'],
      '2022-11-15': ['14:00~15:00'],
      '2022-11-18': ['15:00~16:00'],
      '2022-11-20': ['14:00~15:00', '15:00~16:00'],
    },
  },
};