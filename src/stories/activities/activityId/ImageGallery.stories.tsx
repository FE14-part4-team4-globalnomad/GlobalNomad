import type { Meta, StoryObj } from '@storybook/nextjs';

import ImageGallery from '../../../components/activities/activityId/ImageGallery';

const meta: Meta<typeof ImageGallery> = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ImageGallery>

export const Default: Story = {
  args: {
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=400&q=80',
    ],
  },
}