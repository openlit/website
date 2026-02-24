export default function Sponsored() {
  return (
    <div className="mb-20 flex flex-col items-center gap-3">
      <h2>Sponsored by</h2>
      <div className="flex items-center gap-4">
        <a href="https://www.testmuai.com/?utm_medium=sponsor&utm_source=openlit" target="_blank">
          <img
            src="/static/images/testmu-logo-black.svg"
            style={{ verticalAlign: 'middle' }}
            className="dark:hidden"
            width="202"
          />
          <img
            src="/static/images/testmu-logo-white.svg"
            style={{ verticalAlign: 'middle' }}
            className="hidden dark:block"
            width="202"
          />
        </a>
        <a href="https://www.digitalocean.com/" target="_blank">
          <img
            src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg"
            width="201px"
          />
        </a>
      </div>
    </div>
  )
}
