import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col justify-center w-[80%] items-center space-y-4 mx-auto">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Skeleton key={idx} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}
