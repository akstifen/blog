"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Send, X, ImageIcon } from "lucide-react"
import Link from "next/link"
import { EnhancedImageUpload } from "@/components/enhanced-image-upload"

export default function CreatePostPage() {
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [featuredImage, setFeaturedImage] = useState("")
  const [contentImages, setContentImages] = useState<string[]>([])
  const router = useRouter()
  const [featuredImageFilter, setFeaturedImageFilter] = useState("Normal")
  const [contentImageFilters, setContentImageFilters] = useState<string[]>([])

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "featured" | "content") => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "featured") {
        setFeaturedImage(result)
      } else {
        setContentImages((prev) => [...prev, result])
      }
    }
    reader.readAsDataURL(file)
  }

  const removeContentImage = (index: number) => {
    setContentImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveDraft = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Post saved as draft!")
    setLoading(false)
  }

  const handleSubmitForReview = async () => {
    if (!title || !excerpt || !content || !category) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Post submitted for review!")
    router.push("/author/dashboard")
    setLoading(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/author/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSaveDraft} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={handleSubmitForReview}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Fill in the information for your new blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief description of your post"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="react, nextjs, javascript"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Featured Image
                </CardTitle>
                <CardDescription>Upload and apply Instagram-style filters to your featured image</CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedImageUpload
                  onImageSelect={(imageUrl, filterName) => {
                    setFeaturedImage(imageUrl)
                    setFeaturedImageFilter(filterName || "Normal")
                  }}
                  currentImage={featuredImage}
                  currentFilter={featuredImageFilter}
                />
              </CardContent>
            </Card>

            {/* Content Images */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Content Images
                </CardTitle>
                <CardDescription>Add filtered images to include in your post content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <EnhancedImageUpload
                    onImageSelect={(imageUrl, filterName) => {
                      if (imageUrl) {
                        setContentImages((prev) => [...prev, imageUrl])
                        setContentImageFilters((prev) => [...prev, filterName || "Normal"])
                      }
                    }}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6"
                  />

                  {contentImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {contentImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Content ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                            style={{
                              filter:
                                contentImageFilters[index] === "Normal"
                                  ? "none"
                                  : contentImageFilters[index] === "Grayscale"
                                    ? "grayscale(100%)"
                                    : contentImageFilters[index] === "Sepia"
                                      ? "sepia(100%)"
                                      : contentImageFilters[index] === "Vintage"
                                        ? "sepia(50%) contrast(1.2) brightness(1.1)"
                                        : "none",
                            }}
                          />
                          {contentImageFilters[index] !== "Normal" && (
                            <div className="absolute top-1 left-1">
                              <span className="bg-black/70 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                                {contentImageFilters[index]}
                              </span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              setContentImages((prev) => prev.filter((_, i) => i !== index))
                              setContentImageFilters((prev) => prev.filter((_, i) => i !== index))
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Content *</CardTitle>
                <CardDescription>Write your blog post content (Markdown supported)</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write your blog post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your post will appear</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredImage && (
                      <img
                        src={featuredImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg line-clamp-2">{title || "Your Post Title"}</h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                        {excerpt || "Your post excerpt will appear here..."}
                      </p>
                    </div>
                    {category && (
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    )}
                    {tags && (
                      <div className="flex flex-wrap gap-1">
                        {tags.split(",").map((tag, index) => (
                          <span key={index} className="text-blue-600 text-xs">
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
