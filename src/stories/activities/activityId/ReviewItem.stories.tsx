import type { Meta, StoryObj } from "@storybook/nextjs";

import ReviewItem from "../../../components/activities/activityId/ReviewItem";

const meta: Meta<typeof ReviewItem> = {
  title: "Components/ReviewItem",
  component: ReviewItem,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    date: { control: "text" },
    rating: { control: { type: "range", min: 0, max: 5, step: 1 } },
    content: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ReviewItem>;

export const Default: Story = {
  args: {
    name: "홍길동",
    date: "2025.06.01",
    rating: 4,
    content: "저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!",
  },
};

export const ZeroRating: Story = {
  args: {
    name: "김철수",
    date: "2025.05.30",
    rating: 0,
    content: "아쉬웠던 점이 많지만 다음에는 더 나아지길 기대합니다.",
  },
};

export const FullRating: Story = {
  args: {
    name: "이영희",
    date: "2025.06.02",
    rating: 5,
    content: "최고였어요! 강력 추천합니다.",
  },
};