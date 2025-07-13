"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Palette, Edit } from "lucide-react"
import { ImageFilter } from "./image-filter"

interface EnhancedImageUploadProps {
  onImageSelect: (imageUrl: string, filterName?: string) => void
  currentImage?: string
  currentFilter?: string
  className?: string
}

export function EnhancedImageUpload({
  onImageSelect,
  currentImage,
  currentFilter = "Normal",
  className = "",
}: EnhancedImageUploadProps) {
  const [preview, setPreview] = useState(currentImage || "")
  const [appliedFilter, setAppliedFilter] = useState(currentFilter)
  const [uploading, setUploading] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      setAppliedFilter("Normal")
      onImageSelect(result, "Normal")
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleFilterApply = (filteredImageUrl: string, filterName: string) => {
    setAppliedFilter(filterName)
    onImageSelect(filteredImageUrl, filterName)
    setShowFilterModal(false)
  }

  const removeImage = () => {
    setPreview("")
    setAppliedFilter("Normal")
    onImageSelect("")
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border transition-all duration-200"
            style={{ filter: getFilterCSS(appliedFilter) }}
          />

          {/* Filter Badge */}
          {appliedFilter !== "Normal" && (
            <div className="absolute top-2 left-2">
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Palette className="h-3 w-3 mr-1" />
                {appliedFilter}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowFilterModal(true)}
              className="bg-white/90 hover:bg-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeImage}
              className="bg-red-500/90 hover:bg-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Button */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setShowFilterModal(true)}
              className="bg-black/70 text-white hover:bg-black/80"
            >
              <Palette className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-2">
              <Upload className="h-8 w-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500">{uploading ? "Uploading..." : "Click to upload an image"}</p>
              <p className="text-xs text-gray-400">Add filters after uploading</p>
            </div>
          </label>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && preview && (
        <ImageFilter imageUrl={preview} onFilterApply={handleFilterApply} onClose={() => setShowFilterModal(false)} />
      )}
    </div>
  )
}
