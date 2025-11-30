export default function NavBar({ active }: { active: boolean }) {
  return (
    <>
      <nav
        className={`flex transition-colors z-10 w-full fixed ps-12 ${
          active
            ? "bg-[linear-gradient(120deg,#080014,#231225)] text-amber-50"
            : "bg-transparent text-amber-50"
        }`}
      >
        <ul className="flex w-full h-auto items-center gap-8 text-lg">
          <li className="flex h-20 items-center">
            <a href="">Dashboard</a>
          </li>
          <li className="flex h-20 items-center">
            <a href="">Explore</a>
          </li>
          <li className="flex h-20 items-center">
            <a href="">Profile</a>
          </li>
          <li className="flex h-20 items-center">
            <a href="">About</a>
          </li>
        </ul>
        <div className="bg-transparent w-100"></div>
      </nav>
    </>
  );
}

function YtIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke="currentColor"
        fill="none"
      />
      <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
    </svg>
  );
}
