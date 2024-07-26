import { ContainerScroll } from '../ui/container-scroll'

export default function Demo() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <h2 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black dark:text-white md:text-5xl md:leading-tight">
            Explore the product
          </h2>
        }
      >
        <iframe
          src="https://story.screenspace.io/openlit-4153/e_f1436510"
          height={720}
          width={1400}
          allow="clipboard-write"
          scrolling="no"
          style={{ minHeight: '400px', border: 'none', background: '#EFF0F9' }}
          className="w-full"
          title="screenspace"
        ></iframe>
      </ContainerScroll>
    </div>
  )
}
