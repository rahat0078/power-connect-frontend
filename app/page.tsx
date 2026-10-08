import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
        <h1 className="text-center text-6xl">Power connect</h1>
        <Button>Know something</Button>
      <div className="font-mono text-xs text-muted-foreground">
        (Press <kbd>d</kbd> to toggle dark mode)
      </div>
    </div>
  )
}
