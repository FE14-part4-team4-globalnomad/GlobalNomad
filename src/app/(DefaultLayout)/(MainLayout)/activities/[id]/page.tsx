import ClientActivityDetail from './components/ClientActivityDetail';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const activityId = Number(params.id);
  return <ClientActivityDetail activityId={activityId} />;
}