"use client";
import Image from "next/image";
import NavBar from "./components/NavBar";
import ClientVideoWrapper from "./components/ClientVideoWrapper";
import React, { useState, useEffect, useRef } from "react";
import DropTextRotator from "./components/TextRotator";
import GlobeScene from "./components/GlobeScene";
import CityScene from "./components/CityScene";
import Dashboard from "./components/Dashboard";
import { useGLTF, useTexture } from "@react-three/drei";
import { update } from "three/examples/jsm/libs/tween.module.js";
import { Region } from "@/app/types/Region";

export default function Home() {
  const navRef = useRef<HTMLElement | null>(null);
  const [navActive, setNavActive] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const [regions, setRegions] = useState<Record<string, Region | null>>({});

  useEffect(() => {
    async function load() {
      if (!selectedCity) return;
      const res = await fetch(`/api/regions?city=${selectedCity}`);
      const dbRegions = await res.json();
      const map: Record<string, Region> = {};
      dbRegions.forEach((r: any) => {
        map[r.id] = {
          id: r.id,
          name: r.name,
          population: r.population,
          demands: r.demands ?? [],
          xTile: r.xTile,
          zTile: r.zTile,
          cityId: r.cityId,
        };
      });
      setRegions(map);
      setActiveTile(null);

      console.log("Fetched regions:", map); // Debug
      setRegions(map);
      setActiveTile(null);
    }
    load();
  }, [selectedCity]);

  // Navbar observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setNavActive(!entry.isIntersecting);
    });
    if (navRef.current) {
      observer.observe(navRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.style.opacity =
              entry.target.getAttribute("data-opacity")!;
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {});

  // pass CRUD handlers
  const createRegion = (region: Region) => {
    const key = region.id ?? `${region.xTile}-${region.zTile}`;
    setRegions((prev) => ({ ...prev, [key]: region }));
  };
  const updateRegion = (region: Region) => {
    if (!region.id) return;
    const key = region.id?.toString() ?? `${region.xTile}-${region.zTile}`;
    setRegions((prev) => ({ ...prev, [key]: region }));
  };
  const deleteRegion = (regionId: string) => {
    setRegions((prev) => {
      const newTile = { ...prev };
      delete newTile[regionId];
      return newTile;
    });
  };

  const activeRegion = activeTile ? regions[activeTile] ?? null : null;

  return (
    <>
      <header ref={navRef}>
        <NavBar active={navActive} />
      </header>
      <main role="main" id="main">
        <section
          id="hero"
          className="w-full h-screen flex flex-row items-center"
        >
          <div className="ml-12 mr-12 flex flex-col gap-12 pt-40 pb-24 z-1 w-full h-fit">
            <div className="flex items-start flex-col text-white w-full">
              <h1 className="text-white text-2xl mb-4 [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:white]">
                Welcome,
              </h1>
              <span className="hover:text-transparent mb-5 text-4xl [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:white] transition-all">
                Start analyzing:
              </span>
              <div className="relative w-full h-16">
                <DropTextRotator />
              </div>
            </div>
            <div className="flex flex-col text-white w-full">
              <p className="text-xl mb-5 w-[40%]">
                A Smarter Way to Manage Your Data.
                <br /> “Fast, accurate, and simple”
              </p>
              <button
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-r-4 border-purple-700 hover:border-purple-500 rounded w-fit transition-colors cursor-pointer"
                onClick={() =>
                  document
                    .querySelector(".scene-container")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Go to Globe
              </button>
            </div>
          </div>
          <ClientVideoWrapper />
        </section>
        <section className="flex justify-between items-center w-full h-screen bg-black gap-0.5">
          <div className="scene-container">
            {selectedCity ? (
              <>
                <button
                  className="m-10 absolute cursor-pointer bg-fuchsia-900/50 hover:bg-fuchsia-900/90 pl-6 pr-6 p-2 border-foreground rounded z-2 transition-colors"
                  onClick={() => setSelectedCity(null)}
                >
                  Back
                </button>
                <CityScene
                  regions={regions}
                  activeTile={activeTile}
                  setActiveTile={setActiveTile}
                />
              </>
            ) : (
              <GlobeScene
                onSelectCity={(cityName: string) => setSelectedCity(cityName)}
              />
            )}
          </div>
          {selectedCity ? (
            <Dashboard
              region={activeRegion}
              tileKey={activeTile}
              onCreate={createRegion}
              onUpdate={updateRegion}
              onDelete={() => {
                if (activeTile) deleteRegion(activeTile);
              }}
            />
          ) : null}
        </section>
      </main>
    </>
  );
}

// helper function to turn tile coords to string

useGLTF.preload("/models/CityScape.glb");
useTexture.preload("/textures/HalfBaked.png");
useTexture.preload("/textures/topography_5k.png");
useTexture.preload("/textures/earth_rough.png");
useTexture.preload("/textures/earth_nightlights_10K.png");
useTexture.preload("/textures/earth_landocean_8K.png");
