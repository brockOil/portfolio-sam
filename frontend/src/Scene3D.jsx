import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Octahedron, Points, PointMaterial } from '@react-three/drei';

/* Global normalized mouse position (-1..1), tracked on window so the
   3D layer can stay pointer-events:none and never block hero clicks. */
function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return pointer;
}

/* Slow-drifting wireframe polyhedra + a torus knot, reacting gently to
   pointer position. Kept subtle/slow per "punchy but restrained" motion. */
function FloatingShape({ Geo, position, scale, color, speed = 0.15, args, pointer }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed;
    ref.current.rotation.y = t * speed * 0.7;
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + position[0]) * 0.25;

    const px = pointer.current.x * 1.4;
    const py = pointer.current.y * 1.4;
    ref.current.position.x = position[0] + px * 0.3;
    ref.current.position.z = position[2] + py * 0.15;
  });
  return (
    <Geo ref={ref} position={position} scale={scale} args={args}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </Geo>
  );
}

function ParticleField({ count = 400 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00F0FF"
        size={0.028}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

function Rig({ pointer }) {
  useFrame((state) => {
    state.camera.position.x += (pointer.current.x * 0.6 - state.camera.position.x) * 0.02;
    state.camera.position.y += (pointer.current.y * 0.4 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  const pointer = usePointerRef();
  return (
    <div className="scene3d-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <FloatingShape Geo={Icosahedron} position={[3.4, 0.6, -1]} scale={1.15} color="#00F0FF" speed={0.12} args={[1, 0]} pointer={pointer} />
          <FloatingShape Geo={Octahedron} position={[-3.6, -1.1, -2]} scale={0.9} color="#FF2E88" speed={0.18} args={[1, 0]} pointer={pointer} />
          <FloatingShape Geo={TorusKnot} position={[2.4, -1.6, -3]} scale={0.55} color="#FFC93C" speed={0.1} args={[1, 0.3, 100, 16]} pointer={pointer} />
          <ParticleField />
          <Rig pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
