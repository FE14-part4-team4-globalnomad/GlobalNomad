import type { Meta, StoryObj } from "@storybook/nextjs";

import { CalendarEventBadge } from "../../app/(DefaultLayout)/(ProfileLayout)/calendar/components/CalendarEventBadge";

const meta: Meta<typeof CalendarEventBadge> = {
  title: "Components/Calendar/CalendarEventBadge",
  component: CalendarEventBadge,
  tags: ["autodocs"],
  args: {
    count: 1,
  },
};

export default meta;
type Story = StoryObj<typeof CalendarEventBadge>;

export const ReservationEventBadge: Story = {
  args: {
    label: "예약",
    onClick: () => console.log("예약 클릭"),
  },
};

export const ConfirmEventBadge: Story = {
  args: {
    label: "승인",
    onClick: () => console.log("승인 클릭"),
  },
};

export const CompletedEventBadge: Story = {
  args: {
    label: "완료",
    onClick: () => console.log("완료 클릭"),
  },
};
