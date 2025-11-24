export default function About() {
  return (
    <section id="about" className="flex w-full">
      <div className="flex w-full flex-col-reverse gap-8 bg-neutral-100 p-20 dark:border-neutral-300 dark:bg-neutral-950">
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <video controls>
          <source src="https://openlit.io/static/images/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
