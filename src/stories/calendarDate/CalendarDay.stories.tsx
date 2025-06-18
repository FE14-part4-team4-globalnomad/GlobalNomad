import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

import { CalendarDay } from "../../app/(DefaultLayout)/(ProfileLayout)/calendar/components/CalendarDay";

const meta: Meta<typeof CalendarDay> = {
  title: "Components/CalendarDay",
  component: CalendarDay,
  argTypes: {
    pending: { control: { type: "number", min: 0 }, name: "예약 (pending)" },
    confirmed: {
      control: { type: "number", min: 0 },
      name: "승인 (confirmed)",
    },
    completed: {
      control: { type: "number", min: 0 },
      name: "완료 (completed)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CalendarDay>;

export const Default: Story = {
  args: {
    pending: 3,
    confirmed: 1,
    completed: 2,
  },
  render: (args) => (
    <CalendarDay {...args} onUpdateDotClick={() => alert("Dot clicked!")}>
      <div
        style={{
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          userSelect: "none",
        }}
      >
        <span style={{ fontSize: 24 }}>4</span>
      </div>
    </CalendarDay>
  ),
};
