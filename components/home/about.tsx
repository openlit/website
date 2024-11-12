import Player from 'next-video/player'

export default function About() {
  return (
    <section id="about">
      <div className="bg-muted/50 rounded-lg">
        <div className="flex flex-col-reverse gap-8 bg-neutral-100 dark:border-neutral-300 dark:bg-neutral-950 px-20 pb-8">
          <Player src={'/static/images/demo.mp4'} />
        </div>
      </div>
    </section>
  )
}
