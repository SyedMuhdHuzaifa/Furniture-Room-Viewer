import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './styles.css';

function DraggableFurniture({ url, rotationY, onDragEnd, setControlsEnabled }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState(new THREE.Vector3());
  const { raycaster, mouse, camera } = useThree();

  useFrame(() => {
    if (dragging) {
      raycaster.setFromCamera(mouse, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);
      if (ref.current) {
        ref.current.position.copy(intersectPoint.add(offset));
      }
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    setControlsEnabled(false);
    const intersectPoint = e.point.clone();
    const objectPos = ref.current.position.clone();
    setOffset(objectPos.sub(intersectPoint));
  };

  const handlePointerUp = () => {
    setDragging(false);
    setControlsEnabled(true);
    if (onDragEnd) onDragEnd(ref.current.position);
  };

  return (
    <primitive
      object={scene}
      ref={ref}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, rotationY, 0]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
}

function RoomBackground({ image }) {
  const texture = new THREE.TextureLoader().load(image);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function CameraControls({ enabled }) {
  const controlsRef = useRef();
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = enabled;
    }
  });
  return <OrbitControls ref={controlsRef} enableZoom={true} />;
}

export default function FurnitureInRoomViewer() {
  const location = useLocation();
  const selectedFurniture = location.state?.selectedFurniture;

  const [roomImage, setRoomImage] = useState(null);
  const [rotationY, setRotationY] = useState(0);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const inputRef = useRef();

  const furnitureURL = selectedFurniture?.url || '/chair.glb';

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setRoomImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleRotationChange = (e) => {
    const degrees = parseFloat(e.target.value);
    setRotationY(THREE.MathUtils.degToRad(degrees));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🛋️ Virtual Room Furniture Viewer
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <label className="text-gray-700 font-medium">Rotate Furniture:</label>
            <input
              type="range"
              min="0"
              max="360"
              onChange={handleRotationChange}
              className="w-full sm:w-48 appearance-none bg-blue-200 h-2 rounded"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[70vh]">
          <Canvas camera={{ position: [0, 1.5, 5] }}>
            {roomImage && <RoomBackground image={roomImage} />}
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <DraggableFurniture
              key={furnitureURL}
              url={furnitureURL}
              rotationY={rotationY}
              setControlsEnabled={setControlsEnabled}
            />

            <CameraControls enabled={controlsEnabled} />
            <Environment preset="apartment" background={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
