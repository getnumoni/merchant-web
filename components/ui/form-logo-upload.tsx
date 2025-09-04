"use client"

import { Upload, User, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface FormLogoUploadProps {
  label?: string
  description?: string
  onImageChange: (base64: string | null) => void
  accept?: string
  maxSize?: string
  supportedFormats?: string
}

export function FormLogoUpload({

  description = "Help Customers Find You With A Logo (Optional)",
  onImageChange,
  accept = "image/*",
}: FormLogoUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        setImagePreview(base64)
        onImageChange(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    onImageChange(null)
    // Clear the file input
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative">
        {imagePreview ? (
          <>
            <Image src={imagePreview} alt="Branch Logo" width={128} height={128} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
        )}
      </div>
      <input
        type="file"
        id="logo-upload"
        accept={accept}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => document.getElementById('logo-upload')?.click()}
        className="mb-2 text-gray-800 hover:text-gray-900 border p-2 rounded-full bg-gray-200"
      >
        <span className="flex items-center gap-2 px-4">
          {imagePreview ? 'Tap To Change Logo' : 'Tap To Upload Logo'}
          <Upload className="w-4 h-4" />
        </span>
      </button>
      <p className="text-sm text-black/60 font-semibold">{description}</p>
    </div>
  )
}
