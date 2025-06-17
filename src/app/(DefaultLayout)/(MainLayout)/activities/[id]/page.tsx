import ClientActivityDetail from './components/ClientActivityDetail';

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  return <ClientActivityDetail activityId={activityId} />;
}
