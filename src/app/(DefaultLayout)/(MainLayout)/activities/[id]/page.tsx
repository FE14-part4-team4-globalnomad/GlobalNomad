import ActivityDetailPage from './components/ActivityDetailPage';

export const dynamic = 'force-dynamic';

export default function Page({ params }: { params: { id: string } }) {
  return <ActivityDetailPage params={params} />;
}