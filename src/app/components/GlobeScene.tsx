"use client";
import * as THREE from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Points,
  PointMaterial,
  StarsProps,
  Environment,
  Html,
  Billboard,
} from "@react-three/drei";
import { TextureLoader } from "three";
import { group } from "console";
import { useRef, useEffect, useState, ReactNode } from "react";
import * as random from "maath/random/";
import { EffectComposer, Bloom, LensFlare } from "@react-three/postprocessing";
import { FaMapMarkerAlt } from "react-icons/fa";

interface GlobeSceneProps {
  onSelectCity: (cityName: string) => void;
}

export default function GlobeScene({ onSelectCity }: GlobeSceneProps) {
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    fetch("api/cities")
      .then((res) => res.json())
      .then(setCities)
      .catch(console.error);
  }, []);

  // Sphere materials
  const [colorMap, displacementMap, roughnessMap, emissiveMap, aoMap] =
    useLoader(TextureLoader, [
      "/textures/HalfBaked.png", // color
      "/textures/topography_5k.png", // topographic look
      "/textures/earth_rough.png", // specular inverted
      "/textures/earth_nightlights_10K.png", // city lights look using emissions
      "/textures/earth_landocean_8K.png", // ambient occlussion
    ]);
  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 45, near: 0.001, far: 1000 }}>
        <ambientLight intensity={0.1} />
        <spotLight decay={0} position={[5, 5, -10]} angle={0.4} penumbra={0} />
        {/* <pointLight decay={0} position={[-10, 10, -10]} /> */}
        <mesh castShadow receiveShadow scale={0.4}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            displacementScale={0.1}
            map={colorMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
            aoMapIntensity={1}
            emissive={new THREE.Color(0xdfdf00)}
            emissiveMap={emissiveMap}
            emissiveIntensity={5}
          />

          {/* <group
              position={[-0.5, 0.7, 0.7]}
              // rotation={[0, (-3 * Math.PI) / 4, 0]}
              scale={[5, 5, 5]}
            >
              <Marker>
                <div className="marker-label">
                  <FaMapMarkerAlt
                    style={{ fontSize: 8, color: "#00fea0ab", margin: 1 }}
                  />
                  <div>Place, Country</div>
                </div>
              </Marker>
            </group> */}
          {/* Create markers for every city  */}
          {cities.map((city) => (
            <group
              key={city.id}
              position={[city.xAxis, city.yAxis, city.zAxis]}
              scale={[5, 5, 5]}
            >
              <Marker>
                <div
                  className="marker-label"
                  onClick={() => onSelectCity(city.cityName)}
                >
                  <FaMapMarkerAlt
                    style={{ fontSize: 8, color: "#00fea0ab", margin: 1 }}
                  />
                  <div>
                    {city.cityName}, {city.country}
                  </div>
                </div>
              </Marker>
            </group>
          ))}
        </mesh>
        <EffectComposer>
          <Bloom
            intensity={2}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

        <Stars count={60} />
        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.1}
          minDistance={0}
          maxDistance={2}
          enabled
        />
      </Canvas>
    </>
  );
}

function Stars(props: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  // This determines the sphere where the stars are generated
  const [sphere] = useState(() =>
    random.onSphere(new Float32Array(props.count * 3), { radius: 2.5 })
  );
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere as Float32Array}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#afaf00"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Marker({ children, ...props }: { children?: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  // This holds the local occluded state
  const [isOccluded, setOccluded] = useState<boolean>();
  const [isInRange, setInRange] = useState<boolean>(false);
  const isVisible = isInRange && !isOccluded;
  // Test distance
  const vec = new THREE.Vector3();
  useFrame((state) => {
    let range = false;

    if (ref.current) {
      range =
        state.camera.position.distanceTo(ref.current.getWorldPosition(vec)) <=
        50;
    }

    if (range !== isInRange) setInRange(range);
  });
  return (
    <group ref={ref}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Html
          // Hide contents "behind" other meshes
          occlude
          // Tells us when contents are occluded (rendered using useState)
          onOcclude={setOccluded}
          style={{
            transition: "all 0.2s",
            opacity: isVisible ? 1 : 0,
            transform: `scale(${isVisible ? 4 : 0.25})`,
          }}
          {...props}
        >
          {children}
        </Html>
      </Billboard>
    </group>
  );
}
