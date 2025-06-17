import ClientActivityDetail from './components/ClientActivityDetail';

type PageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: PageProps) {
  const activityId = Number(params.id);
  return <ClientActivityDetail activityId={activityId} />;
}
