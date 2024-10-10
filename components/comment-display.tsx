'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Comment } from '@/lib/types'

interface CommentDisplayProps {
  comments: Comment[]
  contentRect: DOMRect | null
}

export default function CommentDisplay({
  comments,
  contentRect
}: CommentDisplayProps) {
  const calculatePosition = (comment: Comment): React.CSSProperties => {
    if (!contentRect) return {}

    return {
      position: 'absolute',
      top: `${comment.topOffset}px`,
      left: '0',
      width: '100%',
      maxWidth: '300px',
      maxHeight: `${Math.max(comment.height, 100)}px`, // Ensure a minimum height
      overflowY: 'auto', // Allow scrolling for long comments
      marginLeft: '1rem' // Add some space between content and comments
    }
  }

  return (
    <div className="relative">
      {comments.map(comment => (
        <Card
          key={comment.id}
          style={calculatePosition(comment)}
          className="mb-4"
        >
          <CardContent>
            <p>{comment.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
