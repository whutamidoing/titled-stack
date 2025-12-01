"use client";
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Region } from "@/app/types/Region";

interface CityModelProps {
  regions: Record<string, Region | null>;
  setActiveTile: (key: string) => void;
  activeTile: string | null;
}

export default function CityscapeModel({
  regions,
  setActiveTile,
  activeTile,
}: CityModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liftRefs = useRef<{ [key: string]: THREE.Group }>({});

  const { nodes, materials } = useGLTF("/models/CityScape.glb") as any;
  const [hoveredTiles, setHoveredTiles] = useState<{ [key: string]: boolean }>(
    {}
  );
  // const [activeTile, setActiveTile] = useState<string | null>(null); // Tile/region

  useEffect(() => {
    console.log(nodes); // Just to get the mesh names
  }, [nodes]);
  const size = 2.05; // Blender units for now

  useFrame((_, delta) => {
    // Smooth lift when hovering over tile
    Object.keys(liftRefs.current).forEach((key) => {
      const tile = liftRefs.current[key];
      if (!tile) return;
      const targetY = hoveredTiles[key] ? 0.05 : 0; // lift by blender unit
      tile.position.y = THREE.MathUtils.lerp(
        tile.position.y,
        targetY,
        delta * 5
      );
    });
  });

  return (
    <group ref={groupRef} dispose={null}>
      {Object.values(regions)
        .filter((region): region is Region => region !== null)
        .map((region) => {
          const key = region.id.toString();
          console.log(region.name);
          return (
            <group
              key={key}
              ref={(el) => (liftRefs.current[key] = el!)}
              // [x * size - size, 0, z * size - size]
              position={[
                region.xTile! * size - size,
                0,
                region.zTile! * size - size,
              ]}
              onPointerOver={(e) => {
                setHoveredTiles((prev) => ({ ...prev, [key]: true }));
              }}
              onPointerOut={(e) => {
                setHoveredTiles((prev) => ({ ...prev, [key]: false }));
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
                setActiveTile(key);
              }}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane002.geometry}
                material={nodes.Plane002.material}
              >
                <meshStandardMaterial
                  emissive={
                    activeTile === String(key)
                      ? new THREE.Color(0x00ff00)
                      : new THREE.Color(0x009fef)
                  }
                  emissiveIntensity={5}
                />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane002_1.geometry}
                material={nodes.Plane002_1.material}
              ></mesh>
            </group>
          );
        })}
    </group>
  );
}
