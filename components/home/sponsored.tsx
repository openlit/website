export default function Sponsored() {
  return (
    <div className="mb-20 flex flex-col items-center gap-3">
      <h2>Sponsored by</h2>
      <div className="flex items-center gap-4">
        <a
          href="https://www.testmuai.com/?utm_medium=sponsor&utm_source=openlit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/static/images/testmu-logo-black.svg"
            alt="TestMu AI"
            style={{ verticalAlign: 'middle' }}
            className="dark:hidden"
            width="202"
            height="40"
          />
          <img
            src="/static/images/testmu-logo-white.svg"
            alt="TestMu AI"
            style={{ verticalAlign: 'middle' }}
            className="hidden dark:block"
            width="202"
            height="40"
          />
        </a>
        <a href="https://www.digitalocean.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg"
            alt="DigitalOcean"
            width="201"
            height="40"
          />
        </a>
      </div>
    </div>
  )
}
