import type { Meta, StoryObj } from "@storybook/nextjs";

import ReviewList from "../../../components/activities/activityId/ReviewList";

const meta: Meta<typeof ReviewList> = {
  title: "Components/ReviewList",
  component: ReviewList,
  tags: ["autodocs"],
  argTypes: {
    totalReviews: {
      description: "전체 리뷰 수",
      control: { type: "number" },
      defaultValue: 1300,
    },
    averageRating: {
      description: "평균 별점 (0.0 ~ 5.0)",
      control: { type: "number" },
      defaultValue: 4.5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewList>;

export const Default: Story = {
  args: {
    totalReviews: 1300,
    averageRating: 4.5,
  },
};

export const LowRating: Story = {
  args: {
    totalReviews: 300,
    averageRating: 1.8,
  },
};

export const PerfectRating: Story = {
  args: {
    totalReviews: 9800,
    averageRating: 5.0,
  },
};