/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g7iCtzjduWV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function ThreadSkeleton() {
  return (
    <div className="bg-[#2a28542a] px-5 pt-4 pb-12 border-2 border-gray-700 rounded-2xl w-full mr-3 m-3">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <div className="flex gap-2">
            <Skeleton className="h-2 w-16 mb-1" />
            <Skeleton className="h-2 w-8 mb-1" />
          </div>
        </div>
      </div>
      <div className="pl-12">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-1/2 my-2" />
      </div>
      <div className="flex items-center justify-between pl-8">
        <div className="flex space-x-2">
          <Skeleton className="h-8 rounded-full w-8" />
          <Skeleton className="h-8 rounded-full w-8" />
          <Skeleton className="h-8 rounded-full w-8" />
        </div>
        <Skeleton className="h-2 w-16" />
      </div>
      <div className="flex items-center justify-between mt-6 pl-8">
        <Skeleton className="h-7 w-16" />
      </div>
    </div>
  );
}
