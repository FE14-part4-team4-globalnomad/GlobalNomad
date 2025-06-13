import type { Meta, StoryObj } from "@storybook/nextjs";

import ReviewList from "../../../app/activties/[activityId]/components/ReviewList";

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
    reviews: {
      description: "개별 리뷰 데이터 배열",
      control: "object",
    }
  },
};

export default meta; 

type Story = StoryObj<typeof ReviewList>; 

export const Default: Story = {
  args: {
    totalReviews: 1300,
    averageRating: 4.5,
    reviews: [
      {
        name: "홍길동",
        date: "2025.06.01",
        rating: 4,
        content: "저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!",
      },
      {
        name: "김철수",
        date: "2025.05.30",
        rating: 0,
        content: "아쉬웠던 점이 많지만 다음에는 더 나아지길 기대합니다.",
      },
      {
        name: "이영희",
        date: "2025.06.02",
        rating: 5,
        content: "최고였어요! 강력 추천합니다.",
      },
       {
        name: "박보영",
        date: "2025.06.03",
        rating: 3,
        content: "괜찮았어요. 기대했던 것보다는 조금 아쉬웠지만, 그래도 즐거운 경험이었습니다.",
      },
    ],
  },
};