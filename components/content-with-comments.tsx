'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import CommentDisplay from '@/components/comment-display'
import { Comment } from '@/lib/types'

interface SelectionInfo {
  selectedText: string
  startOffset: number
  endOffset: number
  topOffset: number
  bottomOffset: number
  height: number
}

export default function ContentWithComments() {
  const [content, setContent] = useState<string>(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus mi, finibus vitae molestie id, hendrerit ac sem. Morbi ac lorem ante. Curabitur scelerisque, metus at pellentesque vehicula, ipsum augue commodo ipsum, ut feugiat dui orci vitae lorem. Sed ornare pellentesque lorem, id elementum lectus ornare ut. Quisque lacinia ut eros id ultrices. Nullam vestibulum id eros at aliquet. Morbi feugiat vulputate maximus. Quisque porta sollicitudin magna. Nulla lobortis quam sit amet lorem viverra tincidunt. Morbi quis augue volutpat, aliquam massa ac, elementum nisl. Pellentesque vulputate interdum vehicula. Nullam viverra, nulla non posuere efficitur, risus mauris tempus orci, nec gravida diam ex non felis. In porta sollicitudin sapien, eu bibendum turpis. Nunc feugiat varius leo, et aliquet nisl malesuada ac. Nunc vehicula quam ac dui luctus, sed aliquam elit semper.`
  )
  const [comments, setComments] = useState<Comment[]>([])
  const [showCommentInput, setShowCommentInput] = useState<boolean>(false)
  const [contentRect, setContentRect] = useState<DOMRect | null>(null)
  const [currentSelection, setCurrentSelection] =
    useState<SelectionInfo | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentRect(contentRef.current.getBoundingClientRect())
    }
  }, [content])

  const handleSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0 && contentRef.current) {
      const range = selection.getRangeAt(0)
      const rects = range.getClientRects()
      const contentRect = contentRef.current.getBoundingClientRect()

      const topOffset = rects[0].top - contentRect.top
      const bottomOffset = rects[rects.length - 1].bottom - contentRect.top

      setCurrentSelection({
        selectedText: selection.toString(),
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        topOffset,
        bottomOffset,
        height: bottomOffset - topOffset
      })
      setShowCommentInput(true)
    } else {
      setShowCommentInput(false)
      setCurrentSelection(null)
    }
  }

  const addComment = (commentText: string) => {
    if (currentSelection) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: commentText,
        ...currentSelection
      }

      setComments([...comments, newComment])
      setShowCommentInput(false)
      setCurrentSelection(null)
    }
  }

  return (
    <div className="relative flex">
      <div className="w-2/3">
        <div
          ref={contentRef}
          className="prose max-w-none"
          onMouseUp={handleSelection}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {showCommentInput && (
          <Card className="mt-4 p-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Add your comment here..."
              onBlur={e => addComment(e.target.value)}
            />
          </Card>
        )}
      </div>
      <div className="w-1/3 relative">
        <CommentDisplay comments={comments} contentRect={contentRect} />
      </div>
    </div>
  )
}
