"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, PresentationControls } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function SoapBar() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.3, 0.55]} />
        <meshPhysicalMaterial
          color="#8B2E2E"
          metalness={0.05}
          roughness={0.12}
          transmission={0.65}
          thickness={1.8}
          ior={1.45}
          transparent
          opacity={0.92}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationColor="#c45c3a"
          attenuationDistance={0.8}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.35}
        penumbra={0.7}
        intensity={2.2}
        castShadow
        color="#fff5e6"
      />
      <spotLight
        position={[-3, 2, -4]}
        angle={0.5}
        penumbra={1}
        intensity={0.9}
        color="#e8b86d"
      />
      <pointLight position={[0, -2, 2]} intensity={0.6} color="#d4a574" />

      <PresentationControls
        global
        snap
        speed={1.2}
        zoom={0.9}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <SoapBar />
      </PresentationControls>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={4}
      />
      <Environment preset="city" />
    </>
  );
}

export default function SoapScene() {
  return (
    <div className="canvas-container w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
