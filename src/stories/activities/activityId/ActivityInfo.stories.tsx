import type { Meta, StoryObj } from '@storybook/nextjs';

import ActivityInfo from '@/components/activities/activityId/ActivityInfo';

const meta: Meta<typeof ActivityInfo> = {
  title: 'Components/ActivityInfo',
  component: ActivityInfo,
  tags: ['autodocs'],
  argTypes: {
    category: { control: 'text' },
    title: { control: 'text' },
    rating: {
      control: 'object',
    },
    location: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityInfo>;

export const Default: Story = {
  args: {
    category: '문화 체험',
    title: '전통 한지 공예 체험',
    rating: {
      average: 4.3,
      count: 57,
    },
    location: '서울특별시 종로구',
    description: '초보자부터 전문가까지 춤추는 즐거움을 함께 느껴보세요.',
  },
};