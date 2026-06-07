import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import Logo from "./Logo";

// Raw SVG Path definitions from Logo.jsx
const BRAND_SVG_PATHS = {
  // Gold wreath branches
  branches: [
    "M 50,85 C 30,83 18,65 18,48 C 18,31 30,17 48,15", // Left Branch
    "M 50,85 C 70,83 82,65 82,48 C 82,31 70,17 52,15"  // Right Branch
  ],
  // Gold wreath leaves
  goldLeaves: [
    // Left Leaves
    "M 45,84 C 40,84 38,80 40,77 C 42,74 46,75 48,79 C 48,82 47,84 45,84 Z",
    "M 33,80 C 28,78 26,73 29,70 C 32,67 36,69 36,74 C 36,77 35,79 33,80 Z",
    "M 23,71 C 19,68 18,62 21,59 C 24,56 28,59 27,64 C 27,67 25,70 23,71 Z",
    "M 18,60 C 15,56 15,50 19,48 C 22,46 25,49 24,54 C 23,57 21,59 18,60 Z",
    "M 17,47 C 15,42 16,36 20,34 C 23,32 26,36 24,40 C 23,43 20,46 17,47 Z",
    "M 22,34 C 20,29 23,24 27,23 C 31,22 32,26 30,30 C 29,33 25,35 22,34 Z",
    "M 30,24 C 30,19 34,15 38,15 C 42,15 42,19 39,22 C 37,25 33,26 30,24 Z",
    "M 41,17 C 42,12 47,10 50,11 C 53,12 52,17 48,19 C 45,20 42,19 41,17 Z",
    // Right Leaves
    "M 55,84 C 60,84 62,80 60,77 C 58,74 54,75 52,79 C 52,82 53,84 55,84 Z",
    "M 67,80 C 72,78 74,73 71,70 C 68,67 64,69 64,74 C 64,77 65,79 67,80 Z",
    "M 77,71 C 81,68 82,62 79,59 C 76,56 72,59 73,64 C 73,67 75,70 77,71 Z",
    "M 82,60 C 85,56 85,50 81,48 C 78,46 75,49 76,54 C 77,57 79,59 82,60 Z",
    "M 83,47 C 85,42 84,36 80,34 C 77,32 74,36 76,40 C 77,43 80,46 83,47 Z",
    "M 78,34 C 80,29 77,24 73,23 C 69,22 68,26 70,30 C 71,33 75,35 78,34 Z",
    "M 70,24 C 70,19 66,15 62,15 C 58,15 58,19 61,22 C 63,25 67,26 70,24 Z",
    "M 59,17 C 58,12 53,10 50,11 C 47,12 48,17 52,19 C 55,20 58,19 59,17 Z"
  ],
  // Navy central "A" body (strokes in original SVG)
  centralA: [
    "M 36,70 L 47,26 C 48,22 52,22 53,26 L 64,70 M 39,63 L 61,63",
    "M 32,70 L 40,70", // Left leg serif
    "M 60,70 L 68,70"  // Right leg serif
  ],
  // Navy central leaves (fills)
  innerLeaves: [
    "M 50,38 C 42,44 42,56 50,60 C 51,54 48,46 50,38 Z", // Leaf 1
    "M 50,44 C 58,49 56,59 48,61 C 49,55 53,50 50,44 Z"  // Leaf 2
  ]
};

// Extrude config for filled leaf elements
const leafExtrudeSettings = {
  depth: 2.2,
  bevelEnabled: true,
  bevelThickness: 0.6,
  bevelSize: 0.3,
  bevelSegments: 4
};

// Golden Dust Particle System
function GoldenParticles() {
  const count = 150;
  const [particleData] = useState(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.05 + Math.random() * 0.08;
    }
    return [pos, spd];
  });
  const [positions, speeds] = particleData;

  const pointsRef = useRef();

  useFrame((state) => {
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += speeds[i] * 0.1; // move slow upward
      if (posArr[i * 3 + 1] > 8) {
        posArr[i * 3 + 1] = -8; // reset to bottom
      }
    }
    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#c5a059"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Extruded Logo Mesh Component
function ExtrudedLogoGroup({ hoverActive }) {
  const groupRef = useRef();
  const loader = useMemo(() => new SVGLoader(), []);

  // Helper to parse raw path data
  const parsePathData = useMemo(() => {
    return (d) => {
      const svgMarkup = `<svg><path d="${d}" /></svg>`;
      const svgData = loader.parse(svgMarkup);
      return svgData.paths[0];
    };
  }, [loader]);

  // Gold Material (Metallic physically styled)
  const goldMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#c5a059"),
    metalness: 0.95,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
    envMapIntensity: 1.2
  }), []);

  // Navy Material (Ceramic/Gloss lacquer)
  const navyMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#0E1A30"),
    metalness: 0.55,
    roughness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 0.7,
    envMapIntensity: 0.8
  }), []);

  // Generate Extruded Shapes for leaves
  const goldLeafGeometries = useMemo(() => {
    return BRAND_SVG_PATHS.goldLeaves.flatMap(d => {
      const path = parsePathData(d);
      const shapes = SVGLoader.createShapes(path);
      return shapes.map(shape => new THREE.ExtrudeGeometry(shape, leafExtrudeSettings));
    });
  }, [parsePathData]);

  const navyLeafGeometries = useMemo(() => {
    return BRAND_SVG_PATHS.innerLeaves.flatMap(d => {
      const path = parsePathData(d);
      const shapes = SVGLoader.createShapes(path);
      return shapes.map(shape => new THREE.ExtrudeGeometry(shape, leafExtrudeSettings));
    });
  }, [parsePathData]);

  // Generate Tube Geometries for curves (stems/A body)
  const goldBranchGeometries = useMemo(() => {
    return BRAND_SVG_PATHS.branches.map(d => {
      const pathData = parsePathData(d);
      // Retrieve points along the first subpath
      const points2d = pathData.subPaths[0].getPoints(50);
      const points3d = points2d.map(p => new THREE.Vector3(p.x, p.y, 0));
      const curve = new THREE.CatmullRomCurve3(points3d);
      return new THREE.TubeGeometry(curve, 64, 0.7, 8, false);
    });
  }, [parsePathData]);

  const navyLetterAGeometries = useMemo(() => {
    return BRAND_SVG_PATHS.centralA.flatMap(d => {
      const pathData = parsePathData(d);
      // Map each subPath to a Tube
      return pathData.subPaths.map(subPath => {
        const points2d = subPath.getPoints(40);
        const points3d = points2d.map(p => new THREE.Vector3(p.x, p.y, 0));
        const curve = new THREE.CatmullRomCurve3(points3d);
        // Larger thickness for the letter A body
        const isMainA = d.includes("M 36,70");
        const radius = isMainA ? 1.5 : 1.1;
        return new THREE.TubeGeometry(curve, 50, radius, 8, false);
      });
    });
  }, [parsePathData]);

  // Mouse move parallax tracking & continuous rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Constant slow rotation
    const baseRotationY = t * 0.35;

    // Subtle parallax mouse tilt (if pointer/mouse is active)
    let targetX = state.pointer.y * 0.25;
    let targetY = baseRotationY + state.pointer.x * 0.35;

    // Amplify slightly if user is hovering specifically over the container
    if (hoverActive) {
      targetX = state.pointer.y * 0.45;
      targetY = baseRotationY + state.pointer.x * 0.55;
    }

    // Lerp rotation for smooth response
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);

    // Floating vertical oscillation (sine wave)
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.25;
  });

  // Scale factor: scales SVG 100 units down to fit standard canvas (about 8 units size)
  const scale = 0.075;

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    >
      {/* Sub-group to center the 100x100 SVG paths. Center is (50, 50). Flipped Y index since SVG Y grows downward */}
      <group
        position={[-50 * scale, 50 * scale, 0]}
        scale={[scale, -scale, scale]}
      >
        {/* Render Gold Branches */}
        {goldBranchGeometries.map((geo, idx) => (
          <mesh key={`gold-branch-${idx}`} geometry={geo} material={goldMaterial} castShadow receiveShadow />
        ))}

        {/* Render Gold Wreath Leaves */}
        {goldLeafGeometries.map((geo, idx) => (
          <mesh key={`gold-leaf-${idx}`} geometry={geo} material={goldMaterial} castShadow receiveShadow />
        ))}

        {/* Render Navy Letter A */}
        {navyLetterAGeometries.map((geo, idx) => (
          <mesh key={`navy-a-${idx}`} geometry={geo} material={navyMaterial} castShadow receiveShadow />
        ))}

        {/* Render Navy Inner Leaves */}
        {navyLeafGeometries.map((geo, idx) => (
          <mesh key={`navy-leaf-${idx}`} geometry={geo} material={navyMaterial} castShadow receiveShadow />
        ))}
      </group>
    </group>
  );
}

export default function ThreeDLogo({ height = "400px", width = "100%", fallbackSize = "xxl" }) {
  const [hoverActive, setHoverActive] = useState(false);

  // Check if WebGL is supported by client
  const [hasWebGL] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });

  if (!hasWebGL) {
    return (
      <div
        className="flex items-center justify-center relative p-8 rounded-3xl bg-[#fbf9f4] border border-[#0E1A30]/5"
        style={{ height, width }}
      >
        <div className="absolute inset-0 bg-[#c5a059]/2 blur-[50px] pointer-events-none rounded-full" />
        <Logo size={fallbackSize} variant="gold" layout="iconOnly" className="drop-shadow-[0_0_30px_rgba(197,160,89,0.2)]" />
      </div>
    );
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ height, width }}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      {/* Background soft glow behind canvas */}
      <div className="absolute inset-0 bg-radial from-[#c5a059]/4 to-transparent blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
        }}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.4} />
          
          {/* Key Light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            color="#fffcf0"
            castShadow
          />

          {/* Accent Gold Light */}
          <pointLight
            position={[-6, 4, 3]}
            intensity={1.8}
            color="#ffd685"
            decay={1.5}
          />

          {/* Fill/Back Blue Light */}
          <directionalLight
            position={[-5, -5, -3]}
            intensity={0.8}
            color="#6b8aff"
          />

          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <ExtrudedLogoGroup hoverActive={hoverActive} />
          </Float>

          <GoldenParticles />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 2.4}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
