import ClientActivityDetail from './components/ClientActivityDetail';

export default function Page({ params }: { params: { id: string } }) {
  const activityId = Number(params.id);
  return <ClientActivityDetail activityId={activityId} />;
}
