# GlobalNomad

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

```bash
npm install npx -g
npx create-next-app@latest GlobalNomad --typescript
```

## Goals 💡

- 공통 디자인 컴포넌트 문서화를 위한 Storybook 적용
- 전역 상태 관리를 위한 Zustand, 서버 상태 관리를 위한 React-Query 사용
- 편리한 스타일링 작업을 위한 Tailwind CSS 적용
- Next.js 통한 SSR, SSG 활용

## Updates 📝

- 250528 프로젝트 생성 및 Tailwind 설정

## Folder Structure 📁

```
.storybook/
src/
+-- apis/
+-- app/
|   +-- page.ts
+-- assets/
|   +-- fonts/
|   +-- imgs/
|   +-- icons/
+-- components/ (reusable UI components having atoms combined)
|   +-- Button.tsx
|   +-- Header.tsx
|   +-- Footer.tsx
|   +-- Sidebar.tsx
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

## Convention

### 1) Naming Conventions 📝

- variable, function: camelCase
- constant variable: SCREAMING_SNAKE_CASE
- class, component name: PascalCase
- folder name, route path: nocase
- html tag properties (ex. className, id etc.): skewer-case

#### 📚 참고

[**Airbnb JavaScript Style Guide**](https://github.com/airbnb/javascript)

```
1. Avoid single letter names. Be descriptive with your naming.
  1-1. Also, Avoid Mental Mapping.

2. Use camelCase when naming objects, functions, and instances.

3. Use PascalCase only when naming constructors or classes. (also file name)

...
```

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

## Quick Start 🚀

### 1. clone project & install modules

```bash
git clone https://github.com/FE14-part4-team4-globalnomad/GlobalNomad.git
npm install
```

### 2. run the development server

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
