'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface ClientLocation {
  name: string;
  lat: number;
  lng: number;
}

const clientLocations: ClientLocation[] = [
  { name: 'Berlin, Germany', lat: 52.52, lng: 13.405 },
  { name: 'Texas, USA', lat: 31.0, lng: -100.0 },
  { name: 'Minnesota, USA', lat: 46.73, lng: -94.69 },
  { name: 'New Mexico, USA', lat: 34.52, lng: -105.87 },
];

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

// Simplified continent outlines as [lng, lat] pairs
const continents: number[][][] = [
  // North America
  [[-130,50],[-125,55],[-120,60],[-115,65],[-110,68],[-100,70],[-90,68],[-80,65],[-75,60],[-70,55],[-65,48],[-67,44],[-70,42],[-75,38],[-80,32],[-85,30],[-90,28],[-95,26],[-100,28],[-105,30],[-110,32],[-115,32],[-120,35],[-125,40],[-128,45],[-130,50]],
  // South America
  [[-80,10],[-75,12],[-70,12],[-65,10],[-60,5],[-55,2],[-50,0],[-45,-3],[-42,-8],[-38,-12],[-35,-18],[-38,-22],[-42,-25],[-48,-28],[-52,-32],[-55,-35],[-58,-38],[-65,-42],[-68,-50],[-70,-55],[-72,-50],[-73,-45],[-72,-38],[-70,-30],[-70,-22],[-72,-18],[-75,-12],[-78,-5],[-80,0],[-78,5],[-80,10]],
  // Europe
  [[-10,36],[-8,38],[-5,40],[0,42],[2,44],[5,46],[8,48],[10,50],[12,54],[10,56],[12,58],[14,60],[18,62],[20,65],[25,68],[28,70],[32,70],[35,68],[38,65],[40,62],[42,58],[40,55],[35,52],[30,48],[28,45],[25,42],[22,38],[18,36],[12,38],[8,40],[5,42],[2,44],[0,42],[-3,40],[-5,38],[-8,36],[-10,36]],
  // Africa
  [[-15,12],[-17,15],[-12,22],[-8,28],[-5,32],[0,35],[5,36],[10,37],[12,35],[15,32],[20,30],[25,32],[30,32],[35,30],[38,28],[40,22],[42,18],[45,12],[48,8],[50,5],[48,2],[45,-2],[42,-8],[40,-15],[38,-20],[35,-25],[32,-28],[30,-32],[28,-34],[25,-33],[22,-30],[18,-28],[15,-22],[12,-18],[12,-12],[10,-5],[8,0],[5,5],[2,8],[0,10],[-5,12],[-10,12],[-15,12]],
  // Asia
  [[28,42],[32,42],[35,45],[40,42],[45,40],[50,38],[55,35],[60,35],[65,38],[70,40],[75,38],[80,35],[85,28],[88,22],[90,22],[92,18],[95,15],[100,15],[105,18],[108,22],[110,20],[112,15],[115,10],[118,15],[120,22],[122,25],[125,30],[128,35],[130,38],[132,35],[135,38],[140,42],[142,45],[145,48],[148,52],[150,55],[155,58],[160,62],[165,65],[170,68],[175,70],[180,70],[180,65],[175,62],[170,58],[165,55],[160,52],[155,50],[150,48],[145,45],[140,42],[138,38],[135,35],[130,32],[125,28],[120,25],[115,22],[110,18],[105,15],[100,10],[98,5],[100,2],[102,-2],[105,-5],[108,-8],[110,-8],[115,-8],[118,-5],[120,-2],[120,5],[122,8],[125,5],[128,2],[130,-2],[128,-5],[125,-8],[120,-8],[115,-10],[110,-8],[105,-5],[100,0],[95,5],[90,10],[88,15],[85,22],[80,28],[75,32],[70,35],[65,35],[60,32],[55,30],[50,35],[45,38],[40,40],[35,42],[30,42],[28,42]],
  // Australia
  [[115,-15],[118,-18],[120,-20],[122,-22],[125,-25],[128,-28],[130,-30],[132,-32],[135,-35],[138,-36],[142,-38],[145,-38],[148,-36],[150,-34],[152,-30],[153,-28],[150,-25],[148,-22],[145,-18],[142,-15],[140,-12],[138,-12],[135,-14],[132,-14],[130,-13],[128,-15],[125,-14],[122,-16],[120,-18],[118,-20],[115,-22],[114,-25],[115,-28],[118,-32],[120,-34],[122,-35],[125,-34],[128,-32],[130,-30],[115,-15]],
];

function useEarthTexture() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    // Ocean base - very dark gray so the sphere isn't invisible
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Landmasses - lighter gray fill with white outline
    ctx.fillStyle = '#1a1a1a';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;

    for (const continent of continents) {
      ctx.beginPath();
      for (let i = 0; i < continent.length; i++) {
        const [lng, lat] = continent[i];
        const x = ((lng + 180) / 360) * canvas.width;
        const y = ((90 - lat) / 180) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, []);

  return texture;
}

function GlobeWireframe() {
  const globeRef = useRef<THREE.Group>(null);
  const earthTexture = useEarthTexture();

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = [];
    const radius = 2;

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: [number, number, number][] = [];
      for (let lng = 0; lng <= 360; lng += 4) {
        points.push(latLngToVector3(lat, lng, radius));
      }
      lines.push(points);
    }

    for (let lng = 0; lng < 360; lng += 30) {
      const points: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        points.push(latLngToVector3(lat, lng, radius));
      }
      lines.push(points);
    }

    return lines;
  }, []);

  return (
    <group ref={globeRef}>
      <Sphere args={[2, 64, 64]}>
        {earthTexture ? (
          <meshBasicMaterial map={earthTexture} side={THREE.FrontSide} />
        ) : (
          <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
        )}
      </Sphere>

      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {gridLines.map((points, i) => (
        <Line key={i} points={points} color="#ffffff" transparent opacity={0.08} lineWidth={1} />
      ))}

      {clientLocations.map((loc, i) => {
        const pos = latLngToVector3(loc.lat, loc.lng, 2.02);
        return (
          <group key={i} position={pos}>
            <GlowingMarker />
          </group>
        );
      })}

      {clientLocations.map((loc, i) => {
        if (i === 0) return null;
        return <ConnectionArc key={`arc-${i}`} from={clientLocations[0]} to={loc} radius={2} />;
      })}
    </group>
  );
}

function GlowingMarker() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 3) * 0.3);
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.5);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 - Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#22c55e" />
      </mesh>
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.08} />
      </mesh>
    </>
  );
}

function ConnectionArc({ from, to, radius }: { from: ClientLocation; to: ClientLocation; radius: number }) {
  const points = useMemo(() => {
    const [sx, sy, sz] = latLngToVector3(from.lat, from.lng, radius);
    const [ex, ey, ez] = latLngToVector3(to.lat, to.lng, radius);
    const start = new THREE.Vector3(sx, sy, sz);
    const end = new THREE.Vector3(ex, ey, ez);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.3);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50).map((p): [number, number, number] => [p.x, p.y, p.z]);
  }, [from, to, radius]);

  return <Line points={points} color="#22c55e" transparent opacity={0.2} lineWidth={1} />;
}

export function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <GlobeWireframe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.3} minPolarAngle={Math.PI * 0.3} maxPolarAngle={Math.PI * 0.7} />
      </Canvas>
    </div>
  );
}
