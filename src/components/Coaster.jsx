import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import * as THREE from 'three'
import { CatmullRomCurve3 } from 'three'

export default function Coaster() {
  const coasterRef = useRef()
  const { tracks, coasterRunning, coasterPosition, updateCoasterPosition } = useGameStore()

  // Get the first track for the coaster to ride on
  const trackCurve = useMemo(() => {
    if (tracks.length === 0 || tracks[0].points.length < 4) return null
    
    return new CatmullRomCurve3(
      tracks[0].points.map(p => new THREE.Vector3(...p)),
      false,
      'catmullrom',
      0.5
    )
  }, [tracks])

  useFrame((state, delta) => {
    if (!coasterRef.current || !trackCurve || !coasterRunning) return

    // Update position along the curve
    const newPosition = (coasterPosition + delta * 0.5) % 1
    updateCoasterPosition(newPosition)

    // Get position and tangent from curve
    const point = trackCurve.getPoint(newPosition)
    const tangent = trackCurve.getTangent(newPosition)
    
    coasterRef.current.position.copy(point)
    
    // Orient coaster along track
    if (tangent.length() > 0) {
      coasterRef.current.lookAt(point.clone().add(tangent))
    }
  })

  if (!trackCurve || tracks.length === 0) return null

  const initialPoint = trackCurve.getPoint(0)
  const initialTangent = trackCurve.getTangent(0)

  return (
    <group
      ref={coasterRef}
      position={initialPoint}
      rotation={[0, 0, 0]}
    >
      {/* Coaster train */}
      <mesh>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color="#ffd93d" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#6bcf7f" />
      </mesh>
      {/* Wheels */}
      {[-1, 1].map((x) => (
        <group key={x}>
          <mesh position={[x * 0.8, -0.3, -1]}>
            <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[x * 0.8, -0.3, 1]}>
            <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

