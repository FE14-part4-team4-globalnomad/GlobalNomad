import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MyReservationCard from "@/components/card/MyReservationCard";
import "../../styles/globals.css";

const meta = {
  title: "Components/Card/My Reservation",
  component: MyReservationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyReservationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyReservationList: Story = {
  args: {
    activity: {
      bannerImageUrl: `https://images.unsplash.com/photo-1517520267752-34bfde704a0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVDJTk3JUI0JUVBJUI4JUIwJUVBJUI1JUFDfGVufDB8fDB8fHww`,
      title: "함께 배우면 즐거운 스트릿 댄스",
    },
    status: "pending",
    reviewSubmitted: false,
    totalPrice: 174000,
    headCount: 3,
    date: "2025-05-30",
    startTime: "11:00",
    endTime: "12:30",
  },
  render: (args) => {
    return (
      <ul className="grid justify-stretch gap-[22px] tablet:w-[800px]">
        <li>
          <MyReservationCard {...args} />
        </li>
        <li>
          <MyReservationCard {...args} />
        </li>
      </ul>
    );
  },
};
