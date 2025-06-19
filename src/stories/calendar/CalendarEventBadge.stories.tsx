import type { Meta, StoryObj } from "@storybook/nextjs";

import { CalendarEventBadge } from "../../components/calendarDate/CalendarEventBadge";

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

export const 예약: Story = {
  args: {
    type: "예약",
    onClick: () => console.log("예약 클릭"),
  },
};

export const 승인: Story = {
  args: {
    type: "승인",
    onClick: () => console.log("승인 클릭"),
  },
};

export const 완료: Story = {
  args: {
    type: "완료",
    onClick: () => console.log("완료 클릭"),
  },
};
