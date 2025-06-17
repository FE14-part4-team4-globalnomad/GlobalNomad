import dynamicImport from 'next/dynamic';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return [];
}

const ActivityDetailPage = dynamicImport(() => import('./components/ActivityDetailPage'), {
  ssr: false,
});

export default function Page(props: { params: { id: string } }) {
  return <ActivityDetailPage {...props} />;
}