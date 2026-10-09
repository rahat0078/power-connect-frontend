import { Skeleton } from '@/ui/skeleton'
export default function Loading() { return <main className="min-h-screen bg-slate-50 p-8"><Skeleton className="h-8 w-48" /><Skeleton className="mt-3 h-4 w-72" /><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}</div></main> }
