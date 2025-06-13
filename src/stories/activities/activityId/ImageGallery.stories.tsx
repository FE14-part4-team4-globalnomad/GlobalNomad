import type { Meta, StoryObj } from '@storybook/nextjs';

import ImageGallery from '../../../components/activities/activityId/ImageGallery';

const meta: Meta<typeof ImageGallery> = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageGallery>;

export const Default: Story = {
  args: {
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // 큰 이미지
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', // 가운데 위
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80', // 가운데 아래
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80', // 오른쪽 위
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80', // 오른쪽 아래
    ],
  },
};