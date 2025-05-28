import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './AnimatedBackground.css';

const AnimatedBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const particleGroupRef = useRef(null);
  const particlesMaterialRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Load gradient texture for glitter particles
    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load('/src/assets/icons/cyan-pink.png'); // Load your gradient texture here

    // Particle (glitter) setup
    const particleGeometry = new THREE.TetrahedronGeometry(2, 0);
const material = new THREE.MeshPhongMaterial({
  map: gradientTexture, // Apply the gradient texture to particles
  shininess: 100,
  flatShading: true,
  emissive: new THREE.Color(0x8200C9), // Magenta glow for emissive effect
  emissiveIntensity: 1.5,              // Keep the particles glowing
  specular: new THREE.Color(0xffffff), // Specular highlight for more shine
  transparent: true,                   // Enable transparency
  opacity: 0.4,                        // Lower opacity for less intense colors
});

    particlesMaterialRef.current = material;

    const particleGroup = new THREE.Object3D();
    particleGroupRef.current = particleGroup;

    // Parameters to control particle spread and position
    const globeCenterRadius = 80; // Further reduce to make glitter tighter around globe
    const maxDistance = 120; // Reduce this to limit max spread further
    const xOffset = 220; // Shift particles to the right (aligns with globe position)
    const yOffsetLimit = 50; // Limits how far the particles can go upwards (reduce Y-spread)

    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(particleGeometry, material.clone());

      // Calculate a random position in a spherical volume
      const positionVector = new THREE.Vector3(
        (Math.random() - 0.5) * 2, // X-axis
        (Math.random() - 0.5) * 2, // Y-axis
        (Math.random() - 0.5) * 2  // Z-axis
      ).normalize(); // Normalize to unit vector

      // Restrict particles to stay around the globe's proximity on the right side
      positionVector.multiplyScalar(globeCenterRadius + Math.random() * maxDistance);

      // Shift particles toward the right side and apply Y-axis limit
      positionVector.x += xOffset;
      positionVector.y = Math.min(positionVector.y, yOffsetLimit); // Limit Y-axis height

      // Set the calculated position
      mesh.position.set(positionVector.x, positionVector.y, positionVector.z);
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      particleGroup.add(mesh);
    }

    scene.add(particleGroup);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const lights = [
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0x11E8BB, 1),
      new THREE.DirectionalLight(0x8200C9, 1),
    ];
    lights[0].position.set(1, 0, 0);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2].position.set(-0.75, -1, 0.5);
    lights.forEach(light => scene.add(light));

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      particleGroup.rotation.x += 0.0005;
      particleGroup.rotation.y -= 0.002; // Rotate glitter particles around the globe's center
      renderer.render(scene, camera);
    };
    animate();

    // Window resize handling
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      particleGroup.children.forEach(mesh => mesh.geometry.dispose());
      renderer.dispose();
    };
  }, []);

  // Update particle colors based on theme change
  useEffect(() => {
    if (particleGroupRef.current) {
      const newParticleColor = getComputedStyle(document.body).getPropertyValue('--particle-color').trim();
      particleGroupRef.current.children.forEach(mesh => {
        mesh.material.color.set(new THREE.Color(newParticleColor));
      });
    }
  }, [theme]);

  return <div ref={canvasRef} className={`animated-background ${theme}`} />;
};

export default AnimatedBackground;
