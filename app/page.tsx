import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, BookOpen, Shield, Zap } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn the latest features and improvements in Next.js 14",
    author: "John Doe",
    category: "Web Development",
    publishedAt: "2024-01-15",
    tags: ["nextjs", "react", "web-development"],
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "MongoDB Best Practices for 2024",
    excerpt: "Essential MongoDB patterns and practices every developer should know",
    author: "Mike Johnson",
    category: "Database",
    publishedAt: "2024-01-10",
    tags: ["mongodb", "database", "best-practices"],
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const features = [
  {
    icon: Shield,
    title: "Admin Approval",
    description: "Quality content through professional review process",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with developers and share knowledge",
  },
  {
    icon: BookOpen,
    title: "Rich Content",
    description: "Support for markdown, code blocks, and media",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Built with Next.js for optimal performance",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                BlogPlatform
              </h1>
            </div>
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
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
              Share Your Ideas with the World
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              A professional blogging platform with admin-approved publishing workflow. Create, submit, and publish
              high-quality content that matters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl text-lg px-8 py-3"
                >
                  Start Writing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-200 hover:bg-blue-50 text-lg px-8 py-3 bg-transparent"
                >
                  Browse Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BlogPlatform?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for developers, by developers. Experience the future of content publishing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Posts</h3>
            <p className="text-gray-600">Discover the latest insights from our community</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-gray-500">{post.publishedAt}</span>
                    </div>
                    <CardTitle className="text-xl hover:text-blue-600 transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">By {post.author}</span>
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-2 border-blue-200 hover:bg-blue-50 bg-transparent">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">BlogPlatform</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The professional blogging platform for developers. Share knowledge, build community, and grow together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Browse Posts
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    Start Writing
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlogPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
