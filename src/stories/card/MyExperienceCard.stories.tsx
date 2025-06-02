import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MyExperienceCard from "@/components/card/MyExperienceCard";
import "../../styles/globals.css";

const meta = {
  title: "Components/Card/My Experience",
  component: MyExperienceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MyExperienceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MyExperienceList: Story = {
  args: {
    title: "함께 배우면 즐거운 스트릿 댄스",
    price: 58000,
    bannerImageUrl: `https://images.unsplash.com/photo-1517520267752-34bfde704a0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUVDJTk3JUI0JUVBJUI4JUIwJUVBJUI1JUFDfGVufDB8fDB8fHww`,
    rating: 4.3,
    reviewCount: 1580,
  },
  render: (args) => {
    return (
      <ul className="grid justify-stretch gap-[22px] w-[309px] tablet:w-[600px]">
        <li>
          <MyExperienceCard {...args} />
        </li>
        <li>
          <MyExperienceCard {...args} />
        </li>
      </ul>
    );
  },
};
