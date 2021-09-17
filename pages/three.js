import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import React, { useEffect, useRef, useState } from 'react'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useDrag } from 'react-use-gesture'

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState([0, 0, 0])

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  const bind = useDrag(
    ({ delta: [x, y], movement: [mx, my] }) => {
      const [, , z] = position
      // setPosition([x / aspect, -y / aspect, z]);
      const factor = 40
      ref.current.rotation.y -= x / factor
      ref.current.rotation.x += y / factor
    },
    { pointerEvents: true }
  )

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      //   {...bind()}
      ref={ref}
      scale={1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'orange'} />
    </mesh>
  )
}

function Camera(props) {
  const ref = useRef()
  const set = useThree((state) => state.set)
  // Make the camera known to the system
  useEffect(() => void set({ camera: ref.current }), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return <perspectiveCamera ref={ref} {...props} />
}

function CanvasPlayground() {
  return (
    <Canvas style={{ backgroundColor: 'gray', height: 800 }}>
      <ambientLight />
      <pointLight position={[100, 100, 100]} />
      <Box position={[-2.2, 0, 0]} />
      <Box position={[-2.2, 2.1, 0]} />
      <Box position={[2.2, 0, 0]} />
    </Canvas>
  )
}

export default function Three() {
  return (
    <>
      <PageSEO title={`Three.js - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Three.js Playground
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <CanvasPlayground />
        </div>
      </div>
    </>
  )
}
