"use client"

import { useState, useRef } from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  replies: Comment[]
}

export function CommentThread({ address }: { address: string }) {
  const [newComment, setNewComment] = useState("")
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Trader123",
      content: "This token is going to the moon! 🚀",
      timestamp: "2 hours ago",
      replies: [],
    },
    {
      id: "2",
      author: "CryptoWhale",
      content: "Great project, solid fundamentals",
      timestamp: "1 hour ago",
      replies: [
        {
          id: "3",
          author: "NewTrader",
          content: "Agreed! The team is very responsive",
          timestamp: "30 mins ago",
          replies: [],
        },
      ],
    },
  ])

  const handleSubmit = () => {
    if (!newComment.trim() || !captchaToken) {
      alert("Please enter a comment and complete the captcha")
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
    // Reset captcha after submission
    captchaRef.current?.resetCaptcha()
    setCaptchaToken(null)
  }

  return (
    <div className="space-y-4 text-white">
      <div className="space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={(token) => setCaptchaToken(token)}
          ref={captchaRef}
        />
        <Button onClick={handleSubmit} className="bg-[#0d7f76] hover:bg-[#0d7f76]/80" disabled={!captchaToken}>
          Post
        </Button>
      </div>

      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-800 pb-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 bg-gray-700">
                <span className="text-sm">{comment.author[0]}</span>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-sm text-gray-400">{comment.timestamp}</span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
            {comment.replies.length > 0 && (
              <div className="ml-11 mt-4 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 bg-gray-700">
                      <span className="text-sm">{reply.author[0]}</span>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{reply.author}</span>
                        <span className="text-sm text-gray-400">{reply.timestamp}</span>
                      </div>
                      <p className="mt-1">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

