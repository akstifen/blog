"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, RotateCcw } from "lucide-react"

interface ImageFilterProps {
  imageUrl: string
  onFilterApply: (filteredImageUrl: string, filterName: string) => void
  onClose: () => void
}

const filters = [
  {
    name: "Normal",
    css: "none",
    description: "Original image",
  },
  {
    name: "Grayscale",
    css: "grayscale(100%)",
    description: "Black and white",
  },
  {
    name: "Sepia",
    css: "sepia(100%)",
    description: "Vintage brown tone",
  },
  {
    name: "Vintage",
    css: "sepia(50%) contrast(1.2) brightness(1.1)",
    description: "Retro look",
  },
  {
    name: "Bright",
    css: "brightness(1.3) contrast(1.1)",
    description: "Enhanced brightness",
  },
  {
    name: "Contrast",
    css: "contrast(1.4) brightness(1.1)",
    description: "High contrast",
  },
  {
    name: "Saturate",
    css: "saturate(1.8) contrast(1.1)",
    description: "Vivid colors",
  },
  {
    name: "Cool",
    css: "hue-rotate(180deg) saturate(1.2)",
    description: "Cool blue tones",
  },
  {
    name: "Warm",
    css: "hue-rotate(25deg) saturate(1.3) brightness(1.1)",
    description: "Warm golden tones",
  },
  {
    name: "Dramatic",
    css: "contrast(1.5) brightness(0.9) saturate(1.2)",
    description: "High drama",
  },
  {
    name: "Soft",
    css: "blur(0.5px) brightness(1.1) contrast(0.9)",
    description: "Soft dreamy look",
  },
  {
    name: "Fade",
    css: "contrast(0.8) brightness(1.2) saturate(0.8)",
    description: "Faded film look",
  },
]

export function ImageFilter({ imageUrl, onFilterApply, onClose }: ImageFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState(filters[0])

  const handleApplyFilter = () => {
    // In a real app, you'd apply the filter to the actual image data
    // For demo purposes, we'll just pass the CSS filter string
    onFilterApply(imageUrl, selectedFilter.name)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Apply Filter
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setSelectedFilter(filters[0])}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleApplyFilter} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                Apply Filter
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4">
                  Preview: {selectedFilter.name}
                </Badge>
                <div className="relative">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Filter preview"
                    className="w-full h-64 object-cover rounded-lg border"
                    style={{ filter: selectedFilter.css }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedFilter.description}</p>
              </div>
            </div>

            {/* Filter Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose a Filter</h3>
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => setSelectedFilter(filter)}
                    className={`relative group transition-all duration-200 ${
                      selectedFilter.name === filter.name
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                    }`}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={filter.name}
                        className="w-full h-full object-cover"
                        style={{ filter: filter.css }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-medium">{filter.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
