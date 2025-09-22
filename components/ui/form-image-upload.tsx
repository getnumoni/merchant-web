"use client"

import { Upload, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface FormImageUploadProps {
  label: string
  description?: string
  required?: boolean
  placeholder?: string
  onImageChange: (base64: string | null) => void
  onImagesChange?: (base64Array: string[]) => void
  accept?: string
  maxSize?: string
  supportedFormats?: string
  maxImages?: number
  allowMultiple?: boolean
  currentValue?: string | null
  currentValues?: string[]
}

export function FormImageUpload({
  label,
  description,
  required = false,
  onImageChange,
  onImagesChange,
  accept = "image/*",
  maxSize = "3mb",
  supportedFormats = "Jpeg and png files supported",
  maxImages = 5,
  allowMultiple = false,
  currentValue,
  currentValues
}: FormImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(currentValue || null)
  const [imagePreviews, setImagePreviews] = useState<string[]>(currentValues || [])

  // Update image previews when current values change
  useEffect(() => {
    if (allowMultiple && currentValues) {
      setImagePreviews(currentValues)
    } else if (currentValue) {
      setImagePreview(currentValue)
    }
  }, [currentValue, currentValues, allowMultiple])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (allowMultiple && onImagesChange) {
      // Handle multiple images
      const newImages: string[] = []
      let processedCount = 0

      files.forEach((file) => {
        if (imagePreviews.length + newImages.length >= maxImages) return

        const reader = new FileReader()
        reader.onload = (event) => {
          const base64 = event.target?.result as string
          newImages.push(base64)
          processedCount++

          if (processedCount === files.length) {
            const updatedImages = [...imagePreviews, ...newImages]
            setImagePreviews(updatedImages)
            onImagesChange(updatedImages)
          }
        }
        reader.readAsDataURL(file)
      })
    } else {
      // Handle single image (backward compatibility)
      const file = files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const base64 = event.target?.result as string
          setImagePreview(base64)
          onImageChange(base64)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    onImageChange(null)
    // Clear the file input
    const fileInput = document.getElementById(inputId) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleRemoveImageAtIndex = (index: number) => {
    const updatedImages = imagePreviews.filter((_, i) => i !== index)
    setImagePreviews(updatedImages)
    onImagesChange?.(updatedImages)
  }

  const inputId = `image-upload-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="space-y-2">
      <label className="mb-1 block text-sm font-medium text-[#838383]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && (
        <p className="text-xs text-gray-700">
          {description}
        </p>
      )}
      <div className="border-none rounded-lg p-8 text-center bg-gray-100">
        {allowMultiple && onImagesChange ? (
          // Multiple images mode
          <div className="space-y-4">
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreviews.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`${label} Preview ${index + 1}`}
                      width={150}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImageAtIndex(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {imagePreviews.length < maxImages && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById(inputId)?.click()}
                    className="text-gray-800 hover:text-gray-900"
                  >
                    {imagePreviews.length === 0
                      ? <>Tap to <span className="text-green-600 font-medium">upload</span> from device</>
                      : <>Add more photos ({imagePreviews.length}/{maxImages})</>
                    }
                  </button>
                  <p className="text-xs text-gray-500">
                    {supportedFormats}. Max file size {maxSize}.
                    {required && imagePreviews.length === 0 && <span className="text-red-500"> At least 1 photo required.</span>}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Single image mode (backward compatibility)
          <div className="mb-4 relative inline-block">
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt={`${label} Preview`}
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => document.getElementById(inputId)?.click()}
                    className="text-gray-800 hover:text-gray-900"
                  >
                    Tap to <span className="text-green-600 font-medium">upload</span> from device
                  </button>
                  <p className="text-xs text-gray-500">{supportedFormats}. Max file size {maxSize}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <input
          type="file"
          id={inputId}
          accept={accept}
          onChange={handleImageChange}
          multiple={allowMultiple}
          className="hidden"
        />
      </div>
    </div>
  )
}
