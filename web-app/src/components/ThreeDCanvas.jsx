import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDCanvas = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene.add(camera);

    const circle = new THREE.Object3D();
    const skelet = new THREE.Object3D();
    const particle = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);

    const geometry = new THREE.TetrahedronGeometry(2, 0);
    const geom = new THREE.IcosahedronGeometry(7, 1);
    const geom2 = new THREE.IcosahedronGeometry(15, 1);

    // Load gradient texture for globe, particles, and wireframe
    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load('/src/assets/icons/cyan-pink.png'); // Path to gradient texture

    // Material for globe with gradient
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: gradientTexture,
      flatShading: true,
      emissive: new THREE.Color(0x8200C9),  // Magenta tint for glow effect
      emissiveIntensity: 1.5,               // Adjust emissive intensity
      shininess: 100,                        // Higher shininess for more reflection
      specular: new THREE.Color(0xffffff),   // Specular light reflection
    });

    // Material for particles with gradient
    const particleMaterial = new THREE.MeshPhongMaterial({
      map: gradientTexture,                // Use the gradient texture for particles
      emissive: new THREE.Color(0x8200C9), // Magenta tint for glow effect
      emissiveIntensity: 1.5,              // Increase the emissive intensity for the glow
      shininess: 80,                       // Give some reflectivity to particles
      specular: new THREE.Color(0xffffff), // White specular highlight
    });

    // Creating particles with the gradient texture
    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(geometry, particleMaterial); // Use particleMaterial
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      mesh.position.multiplyScalar(90 + Math.random() * 700);
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      particle.add(mesh);
    }

    // Wireframe material with gradient effect
    const wireframeMaterial = new THREE.MeshPhongMaterial({
      map: gradientTexture,                // Use gradient texture for wireframe
      wireframe: true,
      emissive: new THREE.Color(0x8200C9), // Apply glow effect similar to the globe
      emissiveIntensity: 1.2,              // Make wireframe glow slightly
      shininess: 70,                       // Reflective property for wireframe
      specular: new THREE.Color(0xffffff), // White specular highlight
    });

    const planet = new THREE.Mesh(geom, globeMaterial); // Use globeMaterial
    planet.scale.set(27, 27, 27);
    circle.add(planet);

    const planet2 = new THREE.Mesh(geom2, wireframeMaterial); // Use wireframeMaterial for gradient effect
    planet2.scale.set(16, 16, 16);
    skelet.add(planet2);

    // Lighting with increased intensity
    const ambientLight = new THREE.AmbientLight(0x999999, 1.5); // Brighter ambient light
    scene.add(ambientLight);

    const lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight(0x11E8BB, 2); // Cyan light with more intensity
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight(0x8200C9, 2); // Pink light with more intensity
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', onWindowResize, false);

    const onMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);
      
      particle.rotation.x += 0.0000;
      particle.rotation.y -= 0.0040;
      circle.rotation.x -= 0.0020 + mouse.current.y * 0.01;
      circle.rotation.y -= 0.0030 + mouse.current.x * 0.01;
      skelet.rotation.x -= 0.0010;
      skelet.rotation.y += 0.0020;
      renderer.clear();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} className="three-d-canvas" />;
};

export default ThreeDCanvas;
