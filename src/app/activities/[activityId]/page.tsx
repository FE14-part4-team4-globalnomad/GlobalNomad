import ClientActivityDetail from './components/ClientActivityDetail';

interface PageProps {
  params: { activityId: string };
}

export default function Page({ params }: PageProps) {
  const activityId = Number(params.activityId);

  return <ClientActivityDetail activityId={activityId} />;
}