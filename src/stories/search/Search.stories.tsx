<<<<<<< HEAD
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Search } from '../../components/search/Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearch: { action: 'searched' },
=======
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Search } from "../../components/search/Search";

const meta: Meta<typeof Search> = {
  title: "Components/Search",
  component: Search,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    onSearch: { action: "searched" },
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
<<<<<<< HEAD
    placeholder: '내가 원하는 체험은',
=======
    placeholder: "내가 원하는 체험은",
>>>>>>> a2b9340b78a2d037661545fa35591854d681aae3
  },
};
