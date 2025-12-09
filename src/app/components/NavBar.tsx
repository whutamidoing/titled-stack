import Link from "next/link";

export default function NavBar({ active }: { active: boolean }) {
  return (
    <>
      <nav
        className={`flex justify-between items-center transition-colors z-10 w-full fixed ps-12 h-24 ${
          active
            ? "bg-[linear-gradient(120deg,#080014,#231225)] text-amber-50"
            : "bg-transparent text-amber-50"
        }`}
      >
        <div className="flex items-center w-auto h-20">
          <Link href="/">
            <img src="/icons/logos/website.png" alt="" className="w-42" />
          </Link>
        </div>
        <div className="bg-transparent w-100">
          <ul className="flex justify-center w-full h-auto items-center gap-8 text-lg">
            <li className="flex h-20 items-center">
              <a href="https://github.com/whutamidoing/titled-stack">
                <img
                  src="/icons/logos/github-mark-white.png"
                  alt=""
                  className="w-12"
                />
              </a>
            </li>
            <li className="flex h-20 items-center">
              <a href="https://supabase.com/dashboard/project/ecaeqfbqlzmzwvxekwxy">
                <img src="/icons/logos/supabase.png" alt="" className="w-12" />
              </a>
            </li>
            <li className="flex h-20 items-center">
              <Link href="/about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 -960 960 960"
                  width="32px"
                  fill="#ffffff"
                  className="inline m-2"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                About us
              </Link>
            </li>
          </ul>
        </div>
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
