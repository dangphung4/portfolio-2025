import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
      <Skeleton className="w-32 h-32 rounded-full" />
      
      <div className="flex-1 space-y-4 text-center md:text-left">
        <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
        
        <Skeleton className="h-6 w-64 mx-auto md:mx-0" />
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-2xl mx-auto md:mx-0" />
          <Skeleton className="h-4 w-5/6 max-w-xl mx-auto md:mx-0" />
        </div>
      </div>
    </div>
  )
}

export function ProfileTabsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

