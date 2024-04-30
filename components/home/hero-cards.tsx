import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

export const HeroCards = () => {
  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      <Card className="absolute -top-[15px] z-20 w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-lg">Introduction</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          Empowering model understanding and data visualization with its interactive Learning
          Interpretability Tool.
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 z-20 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="mt-8 flex items-center justify-center pb-2">
          <Image
            src="/static/images/open-tel.png"
            alt="OTEL"
            width={96}
            height={96}
            className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
          />
          <CardTitle className="text-center">OTel Native</CardTitle>
          <CardDescription className="text-primary font-normal">Open Telemetry</CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <p>
            Native support ensures that integrating OpenLIT into your projects feels more like a
            natural extension rather than an additional layer of complexity.
          </p>
        </CardContent>
      </Card>

      <Card className="absolute left-[50px] top-[190px] z-20  w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="item-center flex justify-between">Ease of installation</CardTitle>

          <CardDescription>
            Easily integrate OpenLIT into LLM applications with just one line of code for seamless
            monitoring.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <code className="text-sm">openlit.init()</code>
        </CardContent>
      </Card>

      <Card className="absolute -right-[10px] bottom-[35px] z-20  w-[350px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="bg-primary/20 mt-1 rounded-2xl p-1">
            <LightningBoltIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Illuminate your data in style with light and dark mode support.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
