"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Card } from "./card";
import { X, Upload, Link as LinkIcon, Plus } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 6,
}: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImagesChange([...images, base64String]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
      onImagesChange([...images, urlInput]);
      setUrlInput("");
      setShowUrlInput(false);
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <label htmlFor="file-upload">
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowUrlInput(!showUrlInput)}
        >
          <LinkIcon className="h-4 w-4 mr-2" />
          Add URL
        </Button>

        <Badge variant="secondary" className="ml-auto">
          {images.length}/{maxImages}
        </Badge>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlAdd();
              }
            }}
          />
          <Button type="button" onClick={handleUrlAdd} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden p-0">
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
