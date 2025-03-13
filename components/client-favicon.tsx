"use client"

import { useEffect } from 'react'

export default function ClientFavicon() {
  useEffect(() => {
    // Create a new link element
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = '/simple-favicon.svg'
    
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')
    existingLinks.forEach(el => el.parentNode?.removeChild(el))
    
    // Add the new link to the head
    document.head.appendChild(link)
  }, [])
  
  // This component doesn't render anything
  return null
} 