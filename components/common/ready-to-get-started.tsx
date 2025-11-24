import Link from 'next/link'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { BookOpen, Zap } from 'lucide-react'
import { cn } from 'lib/utils'

export default function ReadyToGetStarted({ className }: { className?: string }) {
  return (
    <section className={cn('mx-auto mb-12 w-full max-w-6xl', className)}>
      <Card className="relative overflow-hidden">
        <CardContent className="relative p-12 text-center">
          <h3 className="mb-4 bg-gradient-to-r from-primary-400 via-orange-500 to-red-500 bg-clip-text text-3xl font-bold text-transparent">
            Ready to Transform Your AI Observability?
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Join thousands of developers using OpenLIT to build better, more reliable LLM
            applications. Get started in less than a minute.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="https://docs.openlit.io/latest/quickstart"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                <Zap className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
            </Link>
            <Link href="https://docs.openlit.io" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                Read the Docs
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
