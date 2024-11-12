export default function About() {
  return (
    <section id="about">
      <div className="bg-muted/50 rounded-lg">
        <div className="flex flex-col-reverse gap-8 bg-neutral-100 px-20 pb-8 dark:border-neutral-300 dark:bg-neutral-950">
          {/* eslint-disable jsx-a11y/media-has-caption */}
          <video preload="none">
            <source src="/static/images/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}
