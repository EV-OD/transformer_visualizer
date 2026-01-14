import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Token } from '../../../types';

interface Props {
  tokens: Token[];
  isTrained: boolean;
  isIntro: boolean;
}

const VectorSpace3D: React.FC<Props> = ({ tokens, isTrained, isIntro }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number>(null);
  
  const tokensRef = useRef<Token[]>(tokens);
  const isTrainedRef = useRef<boolean>(isTrained);
  const isIntroRef = useRef<boolean>(isIntro);

  const nodesRef = useRef<Map<string, { mesh: THREE.Group; arrow: THREE.Mesh; geometry: THREE.BufferGeometry; material: THREE.Material }>>(new Map());
  const targetsRef = useRef<Map<string, THREE.Vector3>>(new Map());
  const trainingColorRef = useRef<THREE.Color>(new THREE.Color(0x06b6d4));
  const analogyArrowsRef = useRef<{ kingQueen: THREE.Group; uncleAunt: THREE.Group } | null>(null);

  useEffect(() => {
    tokensRef.current = tokens;
    isTrainedRef.current = isTrained;
    isIntroRef.current = isIntro;
  }, [tokens, isTrained, isIntro]);

  const createTextTexture = (text: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 256;
    ctx.clearRect(0, 0, 512, 256);
    const gradient = ctx.createRadialGradient(256, 128, 0, 256, 128, 220);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.9)');
    gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 90px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.shadowBlur = 20;
    ctx.fillText(text, 256, 128);
    return new THREE.CanvasTexture(canvas);
  };

  const createAnalogyArrow = (scene: THREE.Scene) => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 6, transparent: true, opacity: 1 
    });
    const shaftGeom = new THREE.CylinderGeometry(15, 15, 1, 12);
    const shaft = new THREE.Mesh(shaftGeom, material);
    const headGeom = new THREE.ConeGeometry(35, 70, 12);
    const head = new THREE.Mesh(headGeom, material);
    group.add(shaft);
    group.add(head);
    group.visible = false;
    scene.add(group);
    return group;
  };

  const updateAnalogyArrow = (group: THREE.Group, from: THREE.Vector3, to: THREE.Vector3) => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    if (isNaN(len) || len < 10) { group.visible = false; return; }
    group.visible = true;
    const shaft = group.children[0] as THREE.Mesh;
    const head = group.children[1] as THREE.Mesh;
    shaft.scale.set(1, len, 1);
    shaft.position.copy(from).add(dir.clone().multiplyScalar(0.5));
    head.position.copy(to);
    const axis = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir.clone().normalize());
    shaft.quaternion.copy(quaternion);
    head.quaternion.copy(quaternion);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 1, 20000);
    camera.position.set(1500, 1200, 2000);
    cameraRef.current = camera;
    
    // Performance optimization: limit pixel ratio to 1.5 for better GPU performance
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 400, 0); 
    controlsRef.current = controls;

    const grid = new THREE.GridHelper(5000, 50, 0x1e293b, 0x0f172a);
    scene.add(grid);
    scene.add(new THREE.AmbientLight(0xffffff, 4));
    const spotlight = new THREE.SpotLight(0x06b6d4, 500);
    spotlight.position.set(1000, 3000, 1000);
    scene.add(spotlight);
    analogyArrowsRef.current = {
      kingQueen: createAnalogyArrow(scene),
      uncleAunt: createAnalogyArrow(scene)
    };

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      const currentTokens = tokensRef.current;
      const trained = isTrainedRef.current;
      const intro = isIntroRef.current;
      
      nodesRef.current.forEach((node, id) => {
        const targetPos = targetsRef.current.get(id);
        if (targetPos) {
          node.mesh.position.lerp(targetPos, 0.08);
          const currentPos = node.mesh.position;
          const distance = currentPos.length();
          if (distance > 1) {
            node.arrow.scale.set(1, distance, 1);
            node.arrow.position.copy(currentPos).multiplyScalar(0.5);
            const axis = new THREE.Vector3(0, 1, 0);
            node.arrow.quaternion.setFromUnitVectors(axis, currentPos.clone().normalize());
            const arrowMat = node.arrow.material as THREE.MeshStandardMaterial;
            arrowMat.opacity = intro ? 0.3 : 0.8; 
            node.arrow.visible = true; 
          }
          const meshMat = (node.mesh.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          meshMat.color.lerp(trainingColorRef.current, 0.05);
          meshMat.emissive.lerp(trainingColorRef.current, 0.05);
          const arrowMat = node.arrow.material as THREE.MeshStandardMaterial;
          arrowMat.color.lerp(trainingColorRef.current, 0.05);
          arrowMat.emissive.lerp(trainingColorRef.current, 0.05);
        }
      });

      if (analogyArrowsRef.current && trained && !intro) {
        const getIdx = (text: string) => currentTokens.findIndex(t => t.text.toLowerCase() === text);
        const kingIdx = getIdx('king'), queenIdx = getIdx('queen'), uncleIdx = getIdx('uncle'), auntIdx = getIdx('aunt');
        const getP = (idx: number) => idx !== -1 ? nodesRef.current.get(currentTokens[idx].id)?.mesh.position : null;
        const kingP = getP(kingIdx), queenP = getP(queenIdx), uncleP = getP(uncleIdx), auntP = getP(auntIdx);
        if (kingP && queenP && uncleP && auntP) {
          updateAnalogyArrow(analogyArrowsRef.current.kingQueen, kingP, queenP);
          updateAnalogyArrow(analogyArrowsRef.current.uncleAunt, uncleP, auntP);
        }
      } else if (analogyArrowsRef.current) {
        analogyArrowsRef.current.kingQueen.visible = false;
        analogyArrowsRef.current.uncleAunt.visible = false;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
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
      
      // Strict Cleanup: Dispose of all Three.js resources
      nodesRef.current.forEach((node) => {
        node.geometry.dispose();
        node.material.dispose();
        node.arrow.geometry.dispose();
        (node.arrow.material as THREE.Material).dispose();
      });
      
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      
      if (analogyArrowsRef.current) {
        analogyArrowsRef.current.kingQueen.children.forEach(child => {
           (child as THREE.Mesh).geometry.dispose();
           ((child as THREE.Mesh).material as THREE.Material).dispose();
        });
        analogyArrowsRef.current.uncleAunt.children.forEach(child => {
           (child as THREE.Mesh).geometry.dispose();
           ((child as THREE.Mesh).material as THREE.Material).dispose();
        });
      }

      renderer.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    trainingColorRef.current = new THREE.Color(isTrained ? 0x10b981 : 0x06b6d4);
    tokens.forEach((token, i) => {
      const introX = (i - (tokens.length - 1) / 2) * 320;
      const introY = 600; const introZ = 800;
      const manifoldX = token.embedding[0] * 650;
      const manifoldY = (token.embedding[1] + 1) * 300 + 350; 
      const manifoldZ = token.embedding[2] * 650;
      const targetX = isIntro ? introX : manifoldX;
      const targetY = isIntro ? introY : manifoldY;
      const targetZ = isIntro ? introZ : manifoldZ;
      targetsRef.current.set(token.id, new THREE.Vector3(targetX, targetY, targetZ));
      let node = nodesRef.current.get(token.id);
      if (!node) {
        const group = new THREE.Group();
        const sphereGeom = new THREE.SphereGeometry(30, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({ 
          color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 2, roughness: 0.05, metalness: 0.95 
        });
        const sphere = new THREE.Mesh(sphereGeom, sphereMat);
        group.add(sphere);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: createTextTexture(token.text), transparent: true }));
        sprite.scale.set(300, 150, 1);
        sprite.position.y = 80;
        group.add(sprite);
        scene.add(group);
        const arrowGeom = new THREE.CylinderGeometry(15, 15, 1, 16);
        const arrowMat = new THREE.MeshStandardMaterial({ 
          color: 0x06b6d4, transparent: true, opacity: 0.8, emissive: 0x06b6d4, emissiveIntensity: 1 
        });
        const arrow = new THREE.Mesh(arrowGeom, arrowMat);
        scene.add(arrow);
        nodesRef.current.set(token.id, { mesh: group, arrow, geometry: sphereGeom, material: sphereMat });
        group.position.set(introX, -800, introZ);
      }
    });
    if (cameraRef.current && controlsRef.current) {
      if (isIntro) {
        cameraRef.current.position.lerp(new THREE.Vector3(0, 1000, 3000), 0.1);
        controlsRef.current.target.lerp(new THREE.Vector3(0, 600, 800), 0.1);
      } else {
        cameraRef.current.position.lerp(new THREE.Vector3(1200, 1000, 1600), 0.05);
        controlsRef.current.target.lerp(new THREE.Vector3(0, 450, 0), 0.05);
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = 0.45;
      }
    }
  }, [tokens, isTrained, isIntro]);

  return <div ref={containerRef} className="w-full h-full cursor-move" />;
};

export default VectorSpace3D;