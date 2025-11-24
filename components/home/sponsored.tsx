export default function Sponsored() {
  return (
    <div className="mb-20 flex flex-col items-center gap-3">
      <h2>Sponsored by</h2>
      <div className="flex gap-4">
        <a href="https://www.lambdatest.com/?utm_source=openlit&utm_medium=sponsor" target="_blank">
          <img
            src="https://www.lambdatest.com/blue-logo.png"
            style={{ verticalAlign: 'middle' }}
            width="250"
            height="45"
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
