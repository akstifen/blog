"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Heart, MessageCircle } from "lucide-react"

// Mock data - in real app this would come from API/database
const allPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn the latest features and improvements in Next.js 14, including Server Components, improved routing, and performance optimizations.",
    content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements that make building React applications even better. In this comprehensive guide, we'll explore everything you need to know to get started.

## What's New in Next.js 14

### Server Components by Default
Next.js 14 makes Server Components the default, providing better performance and SEO out of the box.

### Improved App Router
The App Router has been refined with better error handling and improved developer experience.

### Enhanced Performance
- Faster builds
- Optimized bundling
- Better caching strategies

## Getting Started

First, create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features

### 1. Server Components
Server Components run on the server and can directly access databases and APIs:

\`\`\`jsx
async function BlogPost({ id }) {
  const post = await fetch(\`/api/posts/\${id}\`)
  return <article>{post.content}</article>
}
\`\`\`

### 2. Client Components
Use the "use client" directive for interactive components:

\`\`\`jsx
"use client"
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Best Practices

1. **Use Server Components by default** - Only use Client Components when you need interactivity
2. **Optimize images** - Use the Next.js Image component for automatic optimization
3. **Implement proper caching** - Leverage Next.js caching strategies for better performance

## Conclusion

Next.js 14 represents a significant step forward in React development. With its focus on performance, developer experience, and modern web standards, it's the perfect choice for your next project.`,
    author: "John Doe",
    category: "Web Development",
    publishedAt: "2024-01-15",
    tags: ["nextjs", "react", "web-development"],
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "MongoDB Best Practices for 2024",
    excerpt: "Essential MongoDB patterns and practices every developer should know for building scalable applications.",
    content: `# MongoDB Best Practices for 2024

MongoDB continues to be one of the most popular NoSQL databases. Here are the essential practices you should follow to build robust, scalable applications.

## Schema Design Principles

### 1. Embed vs Reference
Choose the right approach based on your data access patterns:

**Embed when:**
- Data is accessed together
- Data doesn't change frequently
- Document size remains reasonable

**Reference when:**
- Data is accessed independently
- Data changes frequently
- You need to avoid document size limits

### 2. Indexing Strategy

Proper indexing is crucial for performance:

\`\`\`javascript
// Create compound indexes for common queries
db.posts.createIndex({ "author": 1, "publishedAt": -1 })

// Use text indexes for search functionality
db.posts.createIndex({ "title": "text", "content": "text" })
\`\`\`

## Performance Optimization

### Query Optimization
- Use projection to limit returned fields
- Implement proper pagination
- Monitor slow queries

### Connection Management
- Use connection pooling
- Set appropriate timeout values
- Monitor connection metrics

## Security Best Practices

### Authentication & Authorization
1. Enable authentication
2. Use role-based access control
3. Implement field-level security

### Data Protection
- Encrypt sensitive data
- Use TLS for connections
- Regular security audits

## Conclusion

Following these best practices will help you build robust MongoDB applications that scale effectively and perform well under load.`,
    author: "Mike Johnson",
    category: "Database",
    publishedAt: "2024-01-10",
    tags: ["mongodb", "database", "best-practices"],
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 3,
    title: "React Server Components Deep Dive",
    excerpt: "Understanding React Server Components and how they revolutionize the way we build React applications.",
    content: `# React Server Components Deep Dive

React Server Components represent a paradigm shift in how we think about React applications. Let's explore this revolutionary feature in detail.

## What are Server Components?

Server Components are React components that run on the server and send their rendered output to the client. They provide several key benefits:

- **Zero bundle size impact**
- **Direct database access**
- **Improved performance**
- **Better SEO**

## How They Work

Server Components are rendered on the server and sent as a special format to the client:

\`\`\`jsx
// This runs on the server
async function BlogPost({ id }) {
  const post = await db.posts.findById(id)
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
\`\`\`

## Benefits

### Performance
- Reduced JavaScript bundle size
- Faster initial page loads
- Better Core Web Vitals

### Developer Experience
- Direct database access
- No need for API routes for data fetching
- Simplified data flow

## Best Practices

1. Use Server Components by default
2. Only use Client Components when needed
3. Keep the component tree as server-rendered as possible
4. Use streaming for better user experience

## Conclusion

Server Components are the future of React development, providing better performance and developer experience.`,
    author: "Sarah Wilson",
    category: "React",
    publishedAt: "2024-01-08",
    tags: ["react", "server-components", "performance"],
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const postId = Number.parseInt(params.id as string)
    const foundPost = allPosts.find((p) => p.id === postId)

    if (foundPost) {
      setPost(foundPost)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
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
              <Link href="/blog">
                <Button variant="ghost" className="hover:bg-blue-50">
                  Browse
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="hover:bg-blue-50">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="aspect-video bg-gradient-to-r from-blue-100 to-indigo-100 relative overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-white/90 text-gray-900 hover:bg-white">{post.category}</Badge>
            </div>
          </div>

          {/* Article Header */}
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="font-medium text-gray-700">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-blue-200 text-blue-700">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLiked(!liked)}
                className={`${liked ? "bg-red-50 border-red-200 text-red-600" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Comment
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-800">{post.content}</div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allPosts
              .filter((p) => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video bg-gradient-to-r from-gray-100 to-gray-200 relative overflow-hidden">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        {relatedPost.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={`/blog/${relatedPost.id}`}>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
