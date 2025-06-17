import ActivityDetailPage from './components/ActivityDetailPage';

export const dynamic = 'force-dynamic';

export default function Page(props: { params: { id: string } }) {
  return <ActivityDetailPage {...props} />;
}