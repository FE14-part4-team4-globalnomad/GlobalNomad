"use client";

interface DescriptionProps {
  content: string;
}

export default function Description({ content }: DescriptionProps) {
  return (
    <section className="mt-4 mb-4 pb-4 w-67 border-b border-gray-200 text-gray-950 tablet:border-t tablet:pt-2 mobile:mt-2 mobile:pt-2 mobile:w-33 mobile:border-t">
      <h2 className="text-18-b mb-1">체험 설명</h2>
      <p className="text-16-body-m">{content}</p>
    </section>
  );
}
