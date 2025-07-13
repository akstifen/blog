"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Eye, Clock, CheckCircle, XCircle, Calendar } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn the latest features and improvements in Next.js 14",
    status: "published",
    createdAt: "2024-01-15",
    publishedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    excerpt: "Deep dive into React Server Components and how they work",
    status: "pending",
    createdAt: "2024-01-14",
    publishedAt: null,
  },
  {
    id: 3,
    title: "Building Scalable APIs",
    excerpt: "Best practices for building APIs that scale",
    status: "draft",
    createdAt: "2024-01-13",
    publishedAt: null,
  },
]

export default function AuthorDashboard() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState(mockPosts)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "author") {
      router.push("/auth/login")
      return
    }
    setUser(parsedUser)
  }, [router])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Edit className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
                Author Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name} ✨</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/author/create-post">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                  <Edit className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
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
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {posts.filter((p) => p.status === "published").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {posts.filter((p) => p.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
                  <Edit className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900">{posts.filter((p) => p.status === "draft").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl text-gray-900">Your Posts</CardTitle>
            <CardDescription>Manage your blog posts and track their status</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-6 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-all duration-300 hover:border-blue-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getStatusIcon(post.status)}
                      <h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
                      <Badge className={`${getStatusColor(post.status)} font-medium`}>{post.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Created: {post.createdAt}
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Published: {post.publishedAt}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {post.status === "published" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 hover:bg-blue-50 text-blue-600 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
