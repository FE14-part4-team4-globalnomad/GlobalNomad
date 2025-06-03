const excludedPaths = ["/oauth"];

/**
 * 특정 URL이 토큰 인증이 **필요한** 경로인지 여부를 판단합니다.
 *
 * @param url 현재 요청 URL
 * @returns true: 토큰 필요 / false: 토큰 불필요
 */
export const isTokenRequired = (url?: string): boolean => {
  if (!url) return true; // URL 없으면 보호 가정

  return !excludedPaths.some((path) => url.includes(path));
};
