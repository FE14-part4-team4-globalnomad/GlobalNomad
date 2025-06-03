import type { Meta, StoryObj } from '@storybook/nextjs';
import React from "react";

import { CalendarDay } from "../../components/calendarDate/CalendarDay";
import { CalendarEventBadge } from "../../components/calendarDate/CalendarEventBadge";

const meta: Meta<typeof CalendarDay> = {
  title: "Components/CalendarDay",
  component: CalendarDay,
  argTypes: {
    예약Count: { control: { type: "number", min: 0 } },
    승인Count: { control: { type: "number", min: 0 } },
    완료Count: { control: { type: "number", min: 0 } },
  },
};

export default meta;

type Story = StoryObj<typeof CalendarDay>;

export const Default: Story = {
  args: {
    예약Count: 3,
    승인Count: 1,
    완료Count: 2,
  },
  render: (args) => {
    const { 예약Count = 0, 승인Count = 0, 완료Count = 0 } = args;
    const shouldShowDot = 예약Count > 0 || 승인Count > 0 || 완료Count > 0;

    return (
      <CalendarDay
        예약Count={예약Count}
        승인Count={승인Count}
        완료Count={완료Count}
        onUpdateDotClick={() => {
          alert("Dot clicked!");
        }}
      >
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
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 24 }}>4</span>
            {shouldShowDot && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 6,
                  height: 6,
                  backgroundColor: "red",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                title="Click to dismiss"
                onClick={() => alert("Dot clicked!")}
              />
            )}
          </div>

          {예약Count > 0 && (
            <CalendarEventBadge type="예약" count={예약Count} onClick={() => {}} />
          )}
          {승인Count > 0 && (
            <CalendarEventBadge type="승인" count={승인Count} onClick={() => {}} />
          )}
          {완료Count > 0 && (
            <CalendarEventBadge type="완료" count={완료Count} onClick={() => {}} />
          )}
        </div>
      </CalendarDay>
    );
  },
};
