
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Chat3DBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    // Color palette for finance theme
    const colorPalette = [
      new THREE.Color('#0ea5e9'), // Finance blue
      new THREE.Color('#10b981'), // Finance green
      new THREE.Color('#8b5cf6'), // Finance purple
      new THREE.Color('#f59e0b'), // Finance gold
      new THREE.Color('#0284c7'), // Deep blue
    ];
    
    // Fill positions and colors
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position in a sphere
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 15;
      
      posArray[i] = Math.cos(angle1) * Math.sin(angle2) * radius;     // x
      posArray[i + 1] = Math.sin(angle1) * Math.sin(angle2) * radius; // y
      posArray[i + 2] = Math.cos(angle2) * radius;                    // z
      
      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Mouse position
    const mouse = {
      x: 0,
      y: 0,
    };
    
    // Track mouse position
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slow rotation based on mouse position
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Mouse influence on rotation
      particlesMesh.rotation.x += mouse.y * 0.0005;
      particlesMesh.rotation.y += mouse.x * 0.0005;
      
      renderer.render(scene, camera);
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', handleResize);
    
    animate();
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

export default Chat3DBackground;
