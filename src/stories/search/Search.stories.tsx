import type { Meta, StoryObj } from '@storybook/nextjs';

import { Search } from '../../components/search/Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearch: { action: 'searched' },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    placeholder: '내가 원하는 체험은',
  },
};
