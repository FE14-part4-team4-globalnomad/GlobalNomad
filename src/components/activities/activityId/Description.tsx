'use client'

interface DescriptionProps {
  content: string
  title: string
}

export default function Description({ content }: DescriptionProps) {
  return (
    <section className="w-67 text-gray-950">
      <h2 className="text-18-b mb-1">체험 설명</h2>
      <p className="text-16-body-m">{content}</p>
    </section>
  )
}