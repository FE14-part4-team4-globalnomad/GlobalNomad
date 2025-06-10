import { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";

import Pagination from "@/components/pagination/Pagination";
import type { PaginationProps } from "@/types/pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
};
