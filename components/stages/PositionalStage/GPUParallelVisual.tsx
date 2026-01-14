import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Token } from '../../../types';
import { createRealisticGPU } from './RealisticGPU';

interface Props {
  tokens: Token[];
}

const GPUParallelVisual: React.FC<Props> = ({ tokens }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 10000);
    camera.position.set(800, 500, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.target.set(0, 50, 0);

    const gpu = createRealisticGPU();
    gpu.group.position.set(0, 50, -200);
    scene.add(gpu.group);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(200, 1000, 500);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const roadWidth = 140; 
    const roadLength = 1000;
    const laneOffsets = [-180, 0, 180]; 
    laneOffsets.forEach((offsetX) => {
      const roadGroup = new THREE.Group();
      roadGroup.position.set(offsetX, 18, 450); 
      const road = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, roadLength), new THREE.MeshStandardMaterial({ 
        color: 0x0f172a, rough: 0.1, metal: 0.8, transparent: true, opacity: 0.6, side: THREE.DoubleSide
      }));
      road.rotation.x = -Math.PI / 2;
      roadGroup.add(road);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0x00f2ff, emissive: 0x00f2ff, emissiveIntensity: 4 });
      const leftEdge = new THREE.Mesh(new THREE.BoxGeometry(2, 2, roadLength), edgeMat);
      leftEdge.position.set(-roadWidth / 2, 1, 0);
      roadGroup.add(leftEdge);
      const rightEdge = new THREE.Mesh(new THREE.BoxGeometry(2, 2, roadLength), edgeMat);
      rightEdge.position.set(roadWidth / 2, 1, 0);
      roadGroup.add(rightEdge);
      scene.add(roadGroup);
    });

    const cuboids: THREE.Group[] = [];
    const createCuboidTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 256; canvas.height = 256;
      ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#00f2ff'; ctx.lineWidth = 20; ctx.strokeRect(0, 0, 256, 256);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 85px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.1 });
    tokens.forEach((token, i) => {
      const cuboidGroup = new THREE.Group();
      const topTex = createCuboidTexture(token.text);
      const materials = [sideMat, sideMat, new THREE.MeshStandardMaterial({ map: topTex, emissive: 0x00f2ff, emissiveIntensity: 0.5 }), sideMat, sideMat, sideMat];
      cuboidGroup.add(new THREE.Mesh(new THREE.BoxGeometry(80, 30, 45), materials));
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(90, 55), new THREE.MeshBasicMaterial({ color: 0x00f2ff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
      glow.rotation.x = -Math.PI / 2; glow.position.y = -14;
      cuboidGroup.add(glow);
      scene.add(cuboidGroup);
      cuboids.push(cuboidGroup);
    });

    let time = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      time += 0.01;
      gpu.update(time);
      controls.update();
      const startZ = 900; const endZ = -60;
      cuboids.forEach((cuboid, i) => {
        const laneIndex = i % 3;
        const xOffset = laneOffsets[laneIndex];
        const progress = ((time * 1.0) + Math.floor(i / 3) * 0.5) % 2; 
        if (progress > 1.2) { cuboid.visible = false; } 
        else if (progress > 0.85) {
          const enterProgress = (progress - 0.85) / 0.15;
          const scale = 1 - (enterProgress * 0.8);
          cuboid.scale.set(scale, scale, scale);
          cuboid.position.set(xOffset, 35 + (enterProgress * 15), THREE.MathUtils.lerp(startZ * 0.15, endZ, enterProgress));
          cuboid.visible = true;
        } else {
          cuboid.scale.set(1, 1, 1);
          cuboid.position.set(xOffset, 35, THREE.MathUtils.lerp(startZ, startZ * 0.15, progress / 0.85));
          cuboid.visible = true;
        }
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, [tokens]);

  return <div ref={containerRef} className="w-full h-full bg-slate-950" />;
};

export default GPUParallelVisual;