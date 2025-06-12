import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/14-4_1912_1749718020858.jpeg */
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**.sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
    //   },
    // { protocol: "http", hostname: "**.domain.co(m|\.kr)" },
    // ],

    remotePatterns: [
      new URL(
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/**",
      ),
    ],
  },
};

export default nextConfig;
