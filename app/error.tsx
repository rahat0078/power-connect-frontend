'use client'
import { Button } from '@/ui/button'
export default function Error({ reset }: { reset: () => void }) { return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="max-w-md text-center"><h1 className="text-2xl font-semibold text-slate-950">Something went wrong</h1><p className="mt-2 text-sm text-slate-500">We couldn&apos;t load this page. Please try again.</p><Button className="mt-6" onClick={reset}>Try again</Button></div></main> }
