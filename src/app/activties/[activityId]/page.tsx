import ClientActivityDetail from './components/ClientActivityDetail';

export default function Page({ params }: { params: { activityId: string } }) {
  return <ClientActivityDetail activityId={Number(params.activityId)} />;
}