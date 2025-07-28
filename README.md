# 🌏 GlobalNomad

> 다양한 지역의 체험을 손쉽게 예약하고 공유할 수 있는 플랫폼, GlobalNomad

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📆 개발기간

- 2025.05.29 ~ 2025.06.24

## 🌐 Url

- **웹사이트**: [https://global-nomad-eight.vercel.app](https://global-nomad-eight.vercel.app)

## 📌 프로젝트 개요

GlobalNomad는 다양한 테마의 지역 체험 콘텐츠를 탐색하고 예약할 수 있는 웹 애플리케이션입니다.  
사용자는 키워드 검색, 카테고리 필터, 정렬 기능 등을 통해 원하는 체험을 쉽게 찾고, 예약 후 후기를 남기며 다른 사용자와 경험을 공유할 수 있습니다.

## 💡 Goals 

- 공통 디자인 컴포넌트 문서화를 위한 Storybook 적용
- 전역 상태 관리를 위한 Zustand, 서버 상태 관리를 위한 React-Query 사용
- 편리한 스타일링 작업을 위한 Tailwind CSS 적용
- Next.js 통한 SSR, SSG 활용

## 🧑‍💻 팀원

<table>
  <tr>
    <th><a href="https://github.com/dkozowlk">@김태욱</a></th>
    <th><a href="https://github.com/callu9">@이수정</a></th>
    <th><a href="https://github.com/LeeJiEuns">@이지은</a></th>
    <th><a href="https://github.com/leeunduck">@이현석</a></th>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/56295839?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/49125725?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/87702194?v=4" width="100"></td>
    <td><img src="https://avatars.githubusercontent.com/u/110515401?v=4" width="100"></td>
  </tr>
</table>

## 🛠 기술스택

### Development

<img src="https://img.shields.io/badge/nextdotjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white">

### Management

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">

### Deployment

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## 📁 폴더 구조

```
.storybook/
public/
|   +-- fonts/
src/
+-- apis/
+-- app/
|   +-- page.ts
|   +-- ...
+-- assets/
|   +-- imgs/
|   +-- icons/
+-- components/ (reusable UI components having atoms combined)
|   +-- Button.tsx
|   +-- Header.tsx
|   +-- Footer.tsx
|   +-- SideMenu.tsx
|   +-- ...
+-- hooks/
+-- layouts/
+-- stores/
+-- stories/ (design components docs for Storybook)
+-- styles/ (style sheets for setting common styles)
+-- types/
+-- utils/
.
.
.
```

## 📌 컨벤션

### 1) Naming Conventions 📝

- variable, function: camelCase
- constant variable: SCREAMING_SNAKE_CASE
- class, component name: PascalCase
- folder name, route path: nocase
- html tag properties (ex. className, id etc.): skewer-case

### 2) Commit Messages 💬

| 태그         | 설명                                                                          |
| ------------ | ----------------------------------------------------------------------------- |
| `feat: `     | 기능 추가                                                                     |
| `fix: `      | 버그를 고친 경우 🛠                                                           |
| `docs: `     | 문서를 수정한 경우 📝                                                         |
| `style: `    | CSS 등 사용자 UI 디자인 변경 🎨                                               |
| `refactor: ` | 프로덕션 코드 리팩토링 🧑‍🔧                                                     |
| `test: `     | 테스트 코드 추가 또는 수정 🧪                                                 |
| `chore: `    | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우 (프로덕션 코드 변경 X) ⚙️ |
| `rename: `   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 ✍️                         |
| `remove: `   | 파일을 삭제하는 작업만 수행한 경우 🗑️                                         |

## 🚀 Quick Start

### 1. clone project & install modules

```bash
git clone https://github.com/FE14-part4-team4-globalnomad/GlobalNomad.git
npm install
```

### 2. run the development serverç

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. run Storybook

스토리북 설정은 `npm create storybook`로 할 수 있습니다. [공식문서](https://storybook.js.org/docs/get-started/install) 참고

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see Storybook Docs.

## 📄 페이지별 주요 기능

### 🏠 메인 페이지
- 체험 검색 (키워드 기반)
- 카테고리 필터 및 정렬 기능
- 인기 체험 슬라이더
- 전체 체험 목록 + 페이지네이션
- 체험 카드 클릭 시 상세 페이지로 이동

### 🧭 체험 상세 페이지
- 체험 이미지 갤러리
- 체험 정보 (제목, 설명, 위치, 평점 등)
- 리뷰 목록 및 평균 평점 표시
- 카카오 지도 연동
- 예약 가능 날짜 및 시간 선택
- 예약하기 기능 (비로그인 시 로그인 유도)

### 📝 회원가입 페이지
- 카카오 OAuth 연동 (카카오 계정으로 회원가입)
- 추가 정보 입력 (닉네임 등)
- 이용약관 및 개인정보 수집 동의 체크

### 🔐 로그인 페이지
- 카카오 로그인 연동
- 로그인 성공 시 메인 혹은 이전 페이지로 리다이렉트

### 👤 내 정보 페이지
- 닉네임 및 프로필 정보 조회
- 로그아웃 기능
- 회원 탈퇴 기능

### 📅 예약내역 페이지
- 내가 예약한 체험 목록 조회
- 예약 상태 필터링 (진행 예정, 완료, 취소 등)
- 예약 취소 기능
- 후기 작성 모달 호출

### 📦 내 체험 관리 페이지
- 내가 등록한 체험 목록 조회
- 체험 상세/수정/삭제 기능
- 예약 현황 페이지로 이동 가능

### 📊 예약 현황 페이지
- 해당 체험의 전체 예약 목록 조회
- 날짜별 예약 필터링
- 예약 승인/거절 처리
