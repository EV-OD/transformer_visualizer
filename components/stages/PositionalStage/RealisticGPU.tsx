
import * as THREE from 'three';

export const createRealisticGPU = () => {
  const gpuGroup = new THREE.Group();

  // Colors & Materials - Clean White/Silver Aesthetic
  const pcbMat = new THREE.MeshStandardMaterial({ 
    color: 0x222222, 
    metalness: 0.5, 
    roughness: 0.5 
  });
  const whiteMetalMat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    metalness: 0.4, 
    roughness: 0.2 
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.8,
    roughness: 0.2
  });
  const silverMetalMat = new THREE.MeshStandardMaterial({ 
    color: 0xdddddd, 
    metalness: 0.9, 
    roughness: 0.1 
  });
  const fanMat = new THREE.MeshStandardMaterial({ 
    color: 0xf8f8f8, 
    metalness: 0.2, 
    roughness: 0.8 
  });
  const glowMat = new THREE.MeshStandardMaterial({ 
    color: 0x00f2ff, 
    emissive: 0x00f2ff, 
    emissiveIntensity: 3,
    transparent: true,
    opacity: 0.9
  });

  // 1. PCB Base
  const pcbGeom = new THREE.BoxGeometry(600, 10, 300);
  const pcb = new THREE.Mesh(pcbGeom, pcbMat);
  gpuGroup.add(pcb);

  // 2. Main Shroud (The "Case") - White Body
  // We'll split the shroud to have cutouts
  const shroudMainGeom = new THREE.BoxGeometry(580, 80, 280);
  const shroud = new THREE.Mesh(shroudMainGeom, whiteMetalMat);
  shroud.position.y = 45;
  gpuGroup.add(shroud);

  // 2b. Port Cutouts (Visual representation using dark boxes on the front face)
  const portOffsets = [-180, 0, 180];
  portOffsets.forEach(x => {
    // A recessed box to look like a port
    const portGeom = new THREE.BoxGeometry(140, 45, 15);
    const port = new THREE.Mesh(portGeom, darkMetalMat);
    port.position.set(x, 40, 140); // On the front face (Z=140)
    gpuGroup.add(port);

    // Port lighting trim
    const trimGeom = new THREE.BoxGeometry(145, 2, 2);
    const trim = new THREE.Mesh(trimGeom, glowMat);
    trim.position.set(x, 18, 148);
    gpuGroup.add(trim);
  });

  // 3. Heatsink Fins - Silver
  const finGeom = new THREE.BoxGeometry(2, 60, 260);
  const finSpacing = 8;
  const numFins = 60;
  for (let i = 0; i < numFins; i++) {
    const fin = new THREE.Mesh(finGeom, silverMetalMat);
    fin.position.set(-240 + i * finSpacing, 45, 0);
    gpuGroup.add(fin);
  }

  // 4. Fans - White Blades
  const fans: THREE.Group[] = [];
  const fanPositions = [-180, 0, 180];
  fanPositions.forEach((pos) => {
    const fanContainer = new THREE.Group();
    fanContainer.position.set(pos, 85, 0);
    
    // Fan Hub
    const hubGeom = new THREE.CylinderGeometry(25, 25, 10, 32);
    const hub = new THREE.Mesh(hubGeom, silverMetalMat);
    fanContainer.add(hub);

    // Fan Blades
    const bladeGeom = new THREE.BoxGeometry(110, 2, 25);
    for (let i = 0; i < 11; i++) {
      const blade = new THREE.Mesh(bladeGeom, fanMat);
      blade.rotation.y = (i / 11) * Math.PI * 2;
      blade.position.y = 2;
      fanContainer.add(blade);
    }
    
    gpuGroup.add(fanContainer);
    fans.push(fanContainer);
  });

  // 5. PCIe Connector
  const pcieGeom = new THREE.BoxGeometry(350, 5, 10);
  const pcie = new THREE.Mesh(pcieGeom, new THREE.MeshStandardMaterial({ 
    color: 0xd4af37, 
    metalness: 1,
    emissive: 0xd4af37,
    emissiveIntensity: 0.1
  }));
  pcie.position.set(-50, -8, -145); // Moved to back for the front ports
  gpuGroup.add(pcie);

  // 6. Glow Strips (Modern Cyan)
  const stripGeom = new THREE.BoxGeometry(500, 3, 6);
  const topStrip = new THREE.Mesh(stripGeom, glowMat);
  topStrip.position.set(0, 82, 135);
  gpuGroup.add(topStrip);

  const bottomStrip = new THREE.Mesh(stripGeom, glowMat);
  bottomStrip.position.set(0, 82, -135);
  gpuGroup.add(bottomStrip);

  // Side Logo Light
  const logoGeom = new THREE.PlaneGeometry(100, 30);
  const logo = new THREE.Mesh(logoGeom, glowMat);
  logo.position.set(-150, 45, 141);
  gpuGroup.add(logo);

  // 7. Input Ports (Backplate)
  const backplateGeom = new THREE.BoxGeometry(10, 80, 280);
  const backplate = new THREE.Mesh(backplateGeom, silverMetalMat);
  backplate.position.set(-295, 45, 0);
  gpuGroup.add(backplate);

  return {
    group: gpuGroup,
    fans,
    update: (time: number) => {
      fans.forEach((fan) => {
        fan.rotation.y += 0.2; 
      });
      glowMat.emissiveIntensity = 2.0 + Math.sin(time * 4) * 1.5;
    }
  };
};
