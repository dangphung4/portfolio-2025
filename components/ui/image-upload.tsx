"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Card } from "./card";
import { X, Plus } from "lucide-react";
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
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-2 flex-1">
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
            className="flex-1"
          />
          <Button type="button" onClick={handleUrlAdd} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        <Badge variant="secondary" className="ml-auto">
          {images.length}/{maxImages}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground">
        Add image URLs only (e.g., from Imgur, Cloudinary, or direct image links)
      </p>

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
