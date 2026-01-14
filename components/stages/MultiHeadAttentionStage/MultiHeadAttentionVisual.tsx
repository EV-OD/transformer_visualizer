import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createHeadBlock, createEllipsis, createTokenCuboid } from './HeadBlock3D';
import { INITIAL_SENTENCE } from '../../../constants';

const MultiHeadAttentionVisual: React.FC = () => {
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
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 15000);
    camera.position.set(1500, 1000, 1800);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.4;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const mainLight = new THREE.PointLight(0xffffff, 2.5);
    mainLight.position.set(500, 2000, 500);
    scene.add(mainLight);

    const headConfigs = [
      { id: "HEAD 1", spec: "Syntactic Parsing", y: 350, color: 0x06b6d4 },
      { id: "HEAD 2", spec: "Semantic Context", y: 50, color: 0x8b5cf6 },
      { id: "HEAD N", spec: "Global Relations", y: -350, color: 0xf43f5e },
    ];

    const heads = headConfigs.map(config => ({
      obj: createHeadBlock(config.id, config.spec, config.color), y: config.y, color: config.color
    }));
    heads.forEach(h => { h.obj.group.position.y = h.y; scene.add(h.obj.group); });

    const dots = createEllipsis(0x334155); dots.position.y = -150; scene.add(dots);
    
    const tokenList: { mesh: THREE.Group; headY: number; progress: number }[] = [];
    const tubes: THREE.Mesh[] = [];

    heads.forEach(h => {
      const tubeGeom = new THREE.CylinderGeometry(25, 25, 800, 12); // Reduced segments
      const tubeMat = new THREE.MeshPhysicalMaterial({ color: h.color, transparent: true, opacity: 0.1, transmission: 0.9, roughness: 0, thickness: 1 });
      const inTube = new THREE.Mesh(tubeGeom, tubeMat); inTube.rotation.z = Math.PI / 2; inTube.position.set(-600, h.y, 0); scene.add(inTube);
      const outTube = new THREE.Mesh(tubeGeom, tubeMat); outTube.rotation.z = Math.PI / 2; outTube.position.set(600, h.y, 0); scene.add(outTube);
      tubes.push(inTube, outTube);

      INITIAL_SENTENCE.slice(0, 4).forEach((text, i) => {
        const tokenMesh = createTokenCuboid(text, h.color); scene.add(tokenMesh);
        tokenList.push({ mesh: tokenMesh, headY: h.y, progress: i * -0.25 });
      });
    });

    let time = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      time += 0.01;
      heads.forEach(h => h.obj.update(time));
      controls.update();
      tokenList.forEach(t => {
        t.progress += 0.005; if (t.progress > 1.2) t.progress = -0.2;
        const x = THREE.MathUtils.lerp(-1000, 1000, t.progress);
        t.mesh.position.set(x, t.headY, 0); t.mesh.rotation.y = time;
        t.mesh.visible = Math.abs(x) > 220;
      });
      if (rendererRef.current && sceneRef.current && cameraRef.current) rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      
      // Strict disposal
      heads.forEach(h => {
        h.obj.group.traverse((child) => {
           if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
              else child.material.dispose();
           }
        });
      });
      
      tubes.forEach(t => {
        t.geometry.dispose();
        (t.material as THREE.Material).dispose();
      });

      tokenList.forEach(t => {
        t.mesh.traverse((child) => {
           if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
           }
        });
      });

      if (rendererRef.current) rendererRef.current.dispose();
      if (containerRef.current && rendererRef.current) containerRef.current.removeChild(rendererRef.current.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default MultiHeadAttentionVisual;