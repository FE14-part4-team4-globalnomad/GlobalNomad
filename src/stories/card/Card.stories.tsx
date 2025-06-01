import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Card from "@/components/card/Card";
import "../../styles/globals.css";

const meta = {
  title: "Components/Card/Main",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArgs = {
  title: "함께 배우면 즐거운 스트릿 댄스",
  price: 58000,
  bannerImageUrl: `https://images.unsplash.com/photo-1517520267752-34bfde704a0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVDJTk3JUI0JUVBJUI4JUIwJUVBJUI1JUFDfGVufDB8fDB8fHww`,
  rating: 4.3,
  reviewCount: 1580,
};

export const MainCard: Story = {
  args: commonArgs,
};
export const MainCardList: Story = {
  args: commonArgs,
  render: (args) => {
    return (
      <div className="grid gap-[16px]">
        <h3 className="text-18-b tablet:text-32-b">🔥 인기 체험</h3>
        <ul className="grid justify-stretch items-center gap-[16px] grid-flow-col overflow-x-scroll desktop:grid-cols-4">
          <li>
            <Card {...args} />
          </li>
          <li>
            <Card {...args} />
          </li>
          <li>
            <Card {...args} />
          </li>
          <li>
            <Card {...args} />
          </li>
        </ul>
      </div>
    );
  },
};
