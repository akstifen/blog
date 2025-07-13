"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, Eye, User, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const mockPendingPosts = [
  {
    id: 2,
    title: "Understanding React Server Components",
    excerpt: "Deep dive into React Server Components and how they revolutionize React applications",
    content: "# Understanding React Server Components\n\nReact Server Components represent a paradigm shift...",
    author: "Jane Smith",
    category: "React",
    tags: ["react", "server-components", "performance"],
    createdAt: "2024-01-14",
    status: "pending",
  },
  {
    id: 4,
    title: "Advanced TypeScript Patterns",
    excerpt: "Explore advanced TypeScript patterns for better code organization",
    content: "# Advanced TypeScript Patterns\n\nTypeScript offers powerful features...",
    author: "Alex Johnson",
    category: "TypeScript",
    tags: ["typescript", "patterns", "advanced"],
    createdAt: "2024-01-13",
    status: "pending",
  },
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState(mockPendingPosts)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/auth/login")
      return
    }
    setUser(parsedUser)
  }, [router])

  const handleApprove = async (postId: number) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setPosts(posts.filter((p) => p.id !== postId))
    alert("Post approved and published!")
    setLoading(false)
  }

  const handleReject = async (postId: number) => {
    if (!feedback.trim()) {
      alert("Please provide feedback for rejection")
      return
    }

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setPosts(posts.filter((p) => p.id !== postId))
    alert("Post rejected with feedback sent to author")
    setFeedback("")
    setLoading(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Review and manage pending posts 🔍</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("user")
                router.push("/")
              }}
              className="border-gray-200 hover:bg-gray-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">{posts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved Today</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected Today</p>
                  <p className="text-3xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Posts */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl text-gray-900">Posts Pending Review</CardTitle>
            <CardDescription>Review and approve or reject submitted posts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up! 🎉</h3>
                <p className="text-gray-600">No posts are waiting for review.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-100 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-300 hover:border-blue-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <span className="flex items-center font-medium">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Submitted: {post.createdAt}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-blue-200 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPost(post)}
                            className="border-gray-200 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview Content
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">{post.title}</DialogTitle>
                            <DialogDescription className="text-base">
                              By {post.author} • {post.category}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-6">
                            <div className="prose max-w-none">
                              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                {post.content}
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <div className="flex items-center space-x-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Post</DialogTitle>
                              <DialogDescription>
                                Provide constructive feedback to help the author improve their post.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                placeholder="Explain why this post is being rejected and provide suggestions for improvement..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                className="border-gray-200 focus:border-red-500"
                              />
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setFeedback("")}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={() => handleReject(post.id)} disabled={loading}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  {loading ? "Rejecting..." : "Reject Post"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          onClick={() => handleApprove(post.id)}
                          disabled={loading}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {loading ? "Approving..." : "Approve & Publish"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
