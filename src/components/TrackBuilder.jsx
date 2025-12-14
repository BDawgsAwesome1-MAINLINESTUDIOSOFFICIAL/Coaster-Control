import { useRef, useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useGameStore } from '../store/gameStore'
import * as THREE from 'three'
import { CatmullRomCurve3, TubeGeometry, MeshStandardMaterial } from 'three'

export default function TrackBuilder() {
  const { camera, raycaster, pointer, scene } = useThree()
  const { buildMode, isBuilding, trackPoints, addTrackPoint, finishTrack } = useGameStore()
  const [hoverPoint, setHoverPoint] = useState(null)
  const trackGroupRef = useRef()
  const previewRef = useRef()

  // Handle mouse movement for track placement
  useFrame(() => {
    if (buildMode !== 'track' || !isBuilding) return

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    
    if (intersects.length > 0) {
      const point = intersects[0].point
      point.y = Math.max(5, point.y) // Minimum height
      setHoverPoint(point)
    }
  })

  // Handle click to place track point
  useEffect(() => {
    const handleClick = (e) => {
      if (buildMode !== 'track' || !isBuilding || e.button !== 0) return
      if (hoverPoint) {
        addTrackPoint([hoverPoint.x, hoverPoint.y, hoverPoint.z])
      }
    }

    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [buildMode, isBuilding, hoverPoint, addTrackPoint])

  // Render track preview
  useFrame(() => {
    if (!previewRef.current || !isBuilding) return

    const points = [...trackPoints]
    if (hoverPoint) {
      points.push([hoverPoint.x, hoverPoint.y, hoverPoint.z])
    }

    if (points.length >= 2) {
      const curve = new CatmullRomCurve3(
        points.map(p => new THREE.Vector3(...p)),
        false,
        'catmullrom',
        0.5
      )

      const geometry = new TubeGeometry(curve, 64, 0.5, 8, false)
      previewRef.current.geometry.dispose()
      previewRef.current.geometry = geometry
    }
  })

  // Render completed tracks
  const { tracks } = useGameStore()

  return (
    <group ref={trackGroupRef}>
      {/* Preview track being built */}
      {isBuilding && (
        <mesh ref={previewRef}>
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      )}

      {/* Hover point indicator */}
      {hoverPoint && isBuilding && (
        <mesh position={[hoverPoint.x, hoverPoint.y, hoverPoint.z]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Completed tracks */}
      {tracks.map((track) => {
        if (track.points.length < 4) return null
        
        const curve = new CatmullRomCurve3(
          track.points.map(p => new THREE.Vector3(...p)),
          false,
          'catmullrom',
          0.5
        )

        return (
          <mesh key={track.id}>
            <primitive object={new TubeGeometry(curve, 128, 0.5, 8, false)} />
            <meshStandardMaterial color="#ff6b6b" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}

      {/* Track points */}
      {trackPoints.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
      ))}
    </group>
  )
}
