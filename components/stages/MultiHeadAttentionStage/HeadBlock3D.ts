
import * as THREE from 'three';

export const createHeadBlock = (title: string, spec: string, color: number) => {
  const group = new THREE.Group();

  // Materials
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 2,
    transparent: true,
    opacity: 0.8,
    emissive: color,
    emissiveIntensity: 0.1,
  });

  const wireMat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 5,
  });

  // Main Cuboid Body
  const geometry = new THREE.BoxGeometry(400, 60, 250);
  const body = new THREE.Mesh(geometry, bodyMat);
  group.add(body);

  // Internal "Circuitry"
  const internalGroup = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const wireGeom = new THREE.BoxGeometry(380, 2, 2);
    const wire = new THREE.Mesh(wireGeom, wireMat);
    wire.position.set(0, 15, -80 + i * 30);
    internalGroup.add(wire);
  }
  group.add(internalGroup);

  // Data Ports (Left/Right)
  const portGeom = new THREE.BoxGeometry(20, 40, 200);
  const leftPort = new THREE.Mesh(portGeom, wireMat);
  leftPort.position.set(-200, 0, 0);
  group.add(leftPort);

  const rightPort = new THREE.Mesh(portGeom, wireMat);
  rightPort.position.set(200, 0, 0);
  group.add(rightPort);

  // Top Label Plate
  const labelCanvas = document.createElement('canvas');
  const ctx = labelCanvas.getContext('2d')!;
  labelCanvas.width = 512;
  labelCanvas.height = 128;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = new THREE.Color(color).getStyle();
  ctx.lineWidth = 12;
  ctx.strokeRect(0, 0, 512, 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 65px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 60);
  ctx.font = '32px Inter, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.fillText(spec, 256, 105);

  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true });
  const labelGeom = new THREE.PlaneGeometry(320, 80);
  const labelMesh = new THREE.Mesh(labelGeom, labelMat);
  labelMesh.rotation.x = -Math.PI / 2;
  labelMesh.position.y = 31;
  group.add(labelMesh);

  return {
    group,
    update: (time: number) => {
      bodyMat.emissiveIntensity = 0.1 + Math.sin(time * 3) * 0.05;
      internalGroup.children.forEach((child, i) => {
        (child as THREE.Mesh).scale.x = 0.9 + Math.sin(time * 4 + i) * 0.1;
      });
      leftPort.scale.y = 0.8 + Math.sin(time * 5) * 0.2;
      rightPort.scale.y = 0.8 + Math.sin(time * 5 + 2) * 0.2;
    }
  };
};

export const createTokenCuboid = (text: string, color: number) => {
  const group = new THREE.Group();
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 128;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = new THREE.Color(color).getStyle();
  ctx.lineWidth = 15;
  ctx.strokeRect(0, 0, 256, 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 70px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshStandardMaterial({ 
    map: texture, 
    emissive: color, 
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 1.0
  });

  const geometry = new THREE.BoxGeometry(70, 20, 35);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  return group;
};

export const createEllipsis = (color: number) => {
  const group = new THREE.Group();
  const geom = new THREE.SphereGeometry(10, 16, 16);
  const mat = new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 2
  });

  for (let i = 0; i < 3; i++) {
    const dot = new THREE.Mesh(geom, mat);
    dot.position.y = -40 + i * 40;
    group.add(dot);
  }
  return group;
};
