// app/comments/page.tsx
import ContentWithComments from '@/components/content-with-comments'

export default async function CommentsPage() {
  return (
    <main className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Document with Comments</h1>
      <ContentWithComments />
    </main>
  )
}
