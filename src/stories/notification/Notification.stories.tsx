import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect } from 'react';

import Notification from '../../components/notification/Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        setTimeout(() => {
          const button = document.querySelector('button');
          if (button) button.click();

          // 알림 박스를 강제로 중앙으로 이동
          const dropdown = document.querySelector('[class*="absolute"]') as HTMLElement;
          if (dropdown) {
            dropdown.style.top = '50%';
            dropdown.style.left = '50%';
            dropdown.style.transform = 'translate(-50%, -50%)';
            dropdown.style.right = 'auto'; // 기존 right: 0 제거
          }
        }, 150);
      }, []);

      return (
        <div className="relative min-h-screen">
          <Story />
        </div>
      );
    },
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {};