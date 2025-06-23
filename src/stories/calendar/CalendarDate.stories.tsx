import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

import { CalendarDate } from "../../app/(DefaultLayout)/(ProfileLayout)/calendar/components/CalendarDate";

const meta: Meta<typeof CalendarDate> = {
  title: "Components/Calendar/CalendarDate",
  component: CalendarDate,
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

type Story = StoryObj<typeof CalendarDate>;

export const Default: Story = {
  args: {
    pending: 3,
    confirmed: 1,
    completed: 2,
  },
  render: (args) => (
    <CalendarDate {...args} onUpdateDotClick={() => alert("Dot clicked!")}>
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
    </CalendarDate>
  ),
};
