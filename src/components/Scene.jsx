import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Grid, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Ground from './Ground'
import TrackBuilder from './TrackBuilder'
import Coaster from './Coaster'
import Lighting from './Lighting'

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[50, 50, 50]} fov={60} />
        <Lighting />
        <Sky sunPosition={[100, 20, 100]} />
        <Grid args={[100, 100]} cellColor="#6f6f6f" sectionColor="#9d4b4b" />
        <Ground />
        <TrackBuilder />
        <Coaster />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={200}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  )
}

