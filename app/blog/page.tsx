"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, BookOpen, Calendar, Clock, Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

const getFilterCSS = (filterName: string) => {
  const filterMap: Record<string, string> = {
    Normal: "none",
    Grayscale: "grayscale(100%)",
    Sepia: "sepia(100%)",
    Vintage: "sepia(50%) contrast(1.2) brightness(1.1)",
    Bright: "brightness(1.3) contrast(1.1)",
    Contrast: "contrast(1.4) brightness(1.1)",
    Saturate: "saturate(1.8) contrast(1.1)",
    Cool: "hue-rotate(180deg) saturate(1.2)",
    Warm: "hue-rotate(25deg) saturate(1.3) brightness(1.1)",
    Dramatic: "contrast(1.5) brightness(0.9) saturate(1.2)",
    Soft: "blur(0.5px) brightness(1.1) contrast(0.9)",
    Fade: "contrast(0.8) brightness(1.2) saturate(0.8)",
  }
  return filterMap[filterName] || "none"
}

const allPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn the latest features and improvements in Next.js 14, including Server Components, improved routing, and performance optimizations.",
    author: "John Doe",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Web Development",
    publishedAt: "2024-01-15",
    tags: ["nextjs", "react", "web-development"],
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Bright",
    likes: 124,
    comments: 18,
    featured: true,
  },
  {
    id: 2,
    title: "MongoDB Best Practices for 2024",
    excerpt: "Essential MongoDB patterns and practices every developer should know for building scalable applications.",
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Database",
    publishedAt: "2024-01-10",
    tags: ["mongodb", "database", "best-practices"],
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Vintage",
    likes: 89,
    comments: 12,
    featured: true,
  },
  {
    id: 3,
    title: "React Server Components Deep Dive",
    excerpt: "Understanding React Server Components and how they revolutionize the way we build React applications.",
    author: "Sarah Wilson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "React",
    publishedAt: "2024-01-08",
    tags: ["react", "server-components", "performance"],
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Sepia",
    likes: 156,
    comments: 24,
    featured: false,
  },
  {
    id: 4,
    title: "TypeScript Advanced Patterns",
    excerpt: "Explore advanced TypeScript patterns and techniques for building robust, type-safe applications.",
    author: "Alex Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "TypeScript",
    publishedAt: "2024-01-05",
    tags: ["typescript", "patterns", "advanced"],
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Contrast",
    likes: 203,
    comments: 31,
    featured: false,
  },
  {
    id: 5,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Learn how to design and implement scalable REST APIs using Node.js, Express, and modern best practices.",
    author: "David Kumar",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "Backend",
    publishedAt: "2024-01-03",
    tags: ["nodejs", "api", "backend", "scalability"],
    readTime: "15 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Saturate",
    likes: 178,
    comments: 22,
    featured: false,
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt: "A comprehensive guide to understanding when to use CSS Grid versus Flexbox for your layouts.",
    author: "Emma Rodriguez",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    category: "CSS",
    publishedAt: "2024-01-01",
    tags: ["css", "grid", "flexbox", "layout"],
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=400",
    imageFilter: "Cool",
    likes: 92,
    comments: 15,
    featured: false,
  },
]

const categories = ["All", "Web Development", "React", "Database", "TypeScript", "Backend", "CSS"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])

  const filteredPosts = allPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      } else if (sortBy === "popular") {
        return b.likes - a.likes
      }
      return 0
    })

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                BlogPlatform
              </h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="hover:bg-blue-50">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts, tags, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500 bg-gray-50"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Instagram-style Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-3 border-b border-gray-100">
                <img
                  src={post.authorAvatar || "/placeholder.svg"}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
              </div>

              {/* Post Image */}
              <Link href={`/blog/${post.id}`}>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ filter: getFilterCSS(post.imageFilter || "Normal") }}
                  />
                  {post.imageFilter && post.imageFilter !== "Normal" && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-black/70 text-white text-xs">{post.imageFilter}</Badge>
                    </div>
                  )}
                  {post.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500 text-white text-xs">Featured</Badge>
                    </div>
                  )}
                </div>
              </Link>

              {/* Post Actions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        likedPosts.includes(post.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      <span className="text-sm font-medium">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                    </button>
                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </Link>
                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`transition-colors ${
                      bookmarkedPosts.includes(post.id) ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${bookmarkedPosts.includes(post.id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-blue-600 text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && <span className="text-gray-400 text-xs">+{post.tags.length - 3} more</span>}
                </div>

                {/* Read More Button */}
                <Link href={`/blog/${post.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  >
                    Read Full Article
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-transparent"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
