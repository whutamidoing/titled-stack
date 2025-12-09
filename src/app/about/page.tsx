import NavBar from "../components/NavBar";
import Link from "next/link";
export default function AboutPage() {
  return (
    <>
      <header>
        <NavBar active={false} />
      </header>
      <main>
        <section className="about flex justify-center items-center h-screen bg-[linear-gradient(120deg,#080014,#231225)] gap-24 p-24">
          <div className="w-full text-white">
            <h1 className="text-2xl mb-6">Welcome to TileVerse!</h1>
            <p className="text-justify mb-5">
              We’re a team of students who wanted to integrate 3D elements in
              our website to bring product markets to life through an
              interactive digital world. As part of our CIS 2102 project, we
              created TileVerse to allow people to easily explore regions, track
              products, understand how a demand works across a city, and make
              the experience interesting.
            </p>
            <p className="text-justify mb-12">
              We wanted to mix the freedom and creativity of 3D objects with
              technology, so we built Tileverse using Next.js, React Three
              Fiber, and Blender to turn city data into a 3D space you can
              explore. Whether you’re checking product demand, managing regional
              data, or just exploring the map, our goal is to make the
              experience interesting and visually engaging.
            </p>
            <Link
              href="/"
              className="p-4 bg-purple-800 border-b-purple-950 border-b-4 border-r-4 border-r-purple-950 hover:bg-purple-950 hover:border-b-purple-900 hover:border-r-purple-900 rounded-full transition-colors"
            >
              Go Back
            </Link>
          </div>
          <div className="w-full">
            <img src="/web.png" alt="" />
          </div>
        </section>
      </main>
    </>
  );
}
