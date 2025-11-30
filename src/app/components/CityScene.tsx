"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CityscapeModel from "./CityscapeModel";
import { EffectComposer, Bloom, LensFlare } from "@react-three/postprocessing";
import * as THREE from "three";

interface CitySceneProps {
  regions: Record<string, any>;
  setActiveTile: (key: string) => void;
  activeTile: string | null;
}

export default function CityScene({
  regions,
  setActiveTile,
  activeTile,
}: CitySceneProps) {
  return (
    <>
      <div className="w-full h-full">
        <Canvas shadows camera={{ position: [2, 2, 2], fov: 60 }}>
          <ambientLight intensity={0.1} />
          {/* <spotLight decay={0} position={[5, 5, -10]} angle={0.4} penumbra={0} /> */}
          <directionalLight intensity={1} color="#a90fef" />
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={0.1}
            minDistance={1}
            maxDistance={3}
            enabled
          />
          <CityscapeModel
            regions={regions}
            setActiveTile={setActiveTile}
            activeTile={activeTile}
          />
          <EffectComposer>
            <Bloom
              intensity={2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
}
