/*
 * Space Photo Studio - Advanced 3D Photographer Portfolio
 * 
 * Designed and developed by Eria Software
 * Copyright © 2024 Eria Software. All rights reserved.
 * 
 * This is a premium 3D portfolio website featuring interactive photo galleries,
 * cosmic photography themes, immersive user experiences, and modern UI/UX.
 * 
 * Technologies: Next.js 15, Three.js, React Three Fiber, TypeScript, Framer Motion
 * 
 * Unauthorized copying, modification, or distribution of this code
 * is strictly prohibited without written permission from Eria Software.
 */

'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Environment, Float, Stars, Sparkles } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSoundEffects } from '@/hooks/useSoundEffects'

// Gallery data structure
const galleryData = {
  'Landscapes': {
    description: 'Breathtaking cosmic landscapes from across the universe',
    details: 'Capturing the raw beauty of alien worlds and cosmic phenomena through my lens. From nebulae to distant planets, each landscape tells a unique story of our universe\'s incredible diversity.',
    images: [
      '/placeholder-1.jpg',
      '/placeholder-2.jpg',
      '/placeholder-3.jpg',
      '/placeholder-4.jpg',
      '/placeholder-5.jpg'
    ]
  },
  'Portraits': {
    description: 'Intergalactic beings and space travelers',
    details: 'Every face has a story to tell, whether human, alien, or artificial. My portrait photography focuses on capturing the essence and unique personality of each subject across the cosmos.',
    images: [
      '/placeholder-2.jpg',
      '/placeholder-1.jpg',
      '/placeholder-4.jpg',
      '/placeholder-3.jpg',
      '/placeholder-5.jpg'
    ]
  },
  'Street': {
    description: 'Candid moments from space stations and colonies',
    details: 'The space lanes and orbital habitats are alive with stories waiting to be captured. My street photography documents the authentic moments and vibrant energy of life among the stars.',
    images: [
      '/placeholder-3.jpg',
      '/placeholder-1.jpg',
      '/placeholder-2.jpg',
      '/placeholder-5.jpg',
      '/placeholder-4.jpg'
    ]
  },
  'Nature': {
    description: 'Alien wildlife and extraterrestrial ecosystems',
    details: 'From microscopic space organisms to massive space whales, alien wildlife photography allows us to witness the incredible diversity of life that exists beyond Earth.',
    images: [
      '/placeholder-4.jpg',
      '/placeholder-2.jpg',
      '/placeholder-1.jpg',
      '/placeholder-3.jpg',
      '/placeholder-5.jpg'
    ]
  },
  'Architecture': {
    description: 'Futuristic structures and space habitats',
    details: 'Space architecture represents the pinnacle of design and engineering. My architectural photography captures the intersection of form, function, and human innovation in the final frontier.',
    images: [
      '/placeholder-5.jpg',
      '/placeholder-1.jpg',
      '/placeholder-3.jpg',
      '/placeholder-2.jpg',
      '/placeholder-4.jpg'
    ]
  }
}

// Modern Photo Frame Component with enhanced effects
function PhotoFrame({ position, rotation, imagePath, title, onClick, hovered, setHovered, isMobile, playHoverSound, playClickSound }: {
  position: [number, number, number]
  rotation: [number, number, number]
  imagePath: string
  title: string
  onClick: () => void
  hovered: string | null
  setHovered: (title: string | null) => void
  isMobile: boolean
  playHoverSound: () => void
  playClickSound: () => void
}) {
  const meshRef = useRef()
  
  const handlePointerOver = useCallback(() => {
    setHovered(title)
    playHoverSound()
  }, [title, setHovered, playHoverSound])
  
  const handleClick = useCallback(() => {
    onClick()
    playClickSound()
  }, [onClick, playClickSound])
  
  return (
    <Float
      speed={isMobile ? 1 : 2}
      rotationIntensity={isMobile ? 0.3 : 0.5}
      floatIntensity={isMobile ? 0.3 : 0.5}
      position={position}
      rotation={rotation}
    >
      <group
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={() => setHovered(null)}
        onClick={handleClick}
        className="cursor-pointer touch-manipulation"
      >
        {/* Enhanced photo frame with glow effect */}
        <mesh>
          <boxGeometry args={isMobile ? [1.8, 2.5, 0.15] : [2.5, 3.5, 0.2]} />
          <meshStandardMaterial 
            color={hovered === title ? '#fbbf24' : '#8b5cf6'} 
            metalness={0.9}
            roughness={0.1}
            emissive={hovered === title ? '#fbbf24' : '#8b5cf6'}
            emissiveIntensity={hovered === title ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Photo with enhanced image */}
        <mesh position={[0, 0, isMobile ? 0.08 : 0.11]}>
          <planeGeometry args={isMobile ? [1.6, 2.3] : [2.3, 3.3]} />
          <meshStandardMaterial 
            color={hovered === title ? '#ffffff' : '#e5e7eb'}
            transparent
            opacity={0.95}
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        
        {/* Enhanced glass overlay with rainbow effect */}
        <mesh position={[0, 0, isMobile ? 0.09 : 0.12]}>
          <planeGeometry args={isMobile ? [1.6, 2.3] : [2.3, 3.3]} />
          <meshStandardMaterial 
            color={hovered === title ? '#ffffff' : '#ffffff'} 
            transparent 
            opacity={hovered === title ? 0.3 : 0.15}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Particle effects when hovered */}
        {hovered === title && (
          <Sparkles 
            position={[0, 0, isMobile ? 0.1 : 0.13]}
            count={15}
            scale={isMobile ? 0.8 : 1}
            size={2}
            speed={0.8}
            opacity={0.8}
          />
        )}
        
        {/* Enhanced title plaque */}
        <mesh position={[0, isMobile ? -1.3 : -2, isMobile ? 0.08 : 0.11]}>
          <boxGeometry args={isMobile ? [1.3, 0.2, 0.04] : [1.8, 0.3, 0.05]} />
          <meshStandardMaterial 
            color="#1f2937"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Enhanced title text */}
        <Text
          position={[0, isMobile ? -1.3 : -2, isMobile ? 0.11 : 0.14]}
          fontSize={isMobile ? 0.08 : 0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  )
}

// Enhanced 3D Scene Component
function Scene({ setSelectedCategory, isMobile, playHoverSound, playClickSound }: { 
  setSelectedCategory: (category: string) => void; 
  isMobile: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null)
  
  // Photography categories with mobile-optimized positions
  const photos = [
    { 
      title: 'Landscapes', 
      position: isMobile ? [-2, 1, 0] as [number, number, number] : [-3, 1.5, 0] as [number, number, number], 
      rotation: [0, 0.3, 0] as [number, number, number],
      previewImage: '/placeholder-1.jpg'
    },
    { 
      title: 'Portraits', 
      position: isMobile ? [2, 1, 0] as [number, number, number] : [3, 1.5, 0] as [number, number, number], 
      rotation: [0, -0.3, 0] as [number, number, number],
      previewImage: '/placeholder-2.jpg'
    },
    { 
      title: 'Street', 
      position: [0, 0, -1] as [number, number, number], 
      rotation: [0, 0, 0] as [number, number, number],
      previewImage: '/placeholder-3.jpg'
    },
    { 
      title: 'Nature', 
      position: isMobile ? [-2, -1, 0] as [number, number, number] : [-3, -1.5, 0] as [number, number, number], 
      rotation: [0, 0.3, 0] as [number, number, number],
      previewImage: '/placeholder-4.jpg'
    },
    { 
      title: 'Architecture', 
      position: isMobile ? [2, -1, 0] as [number, number, number] : [3, -1.5, 0] as [number, number, number], 
      rotation: [0, -0.3, 0] as [number, number, number],
      previewImage: '/placeholder-5.jpg'
    },
  ]

  return (
    <>
      {/* Enhanced Lighting with multiple colored lights */}
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#ffd700" />
      <pointLight position={[0, 10, 0]} intensity={1} color="#ff6b6b" />
      <pointLight position={[0, -10, 0]} intensity={1} color="#4ecdc4" />
      
      {/* Enhanced Environment */}
      <Environment preset="sunset" />
      <Stars radius={100} depth={50} count={2000} factor={3} />
      <Sparkles position={[0, 0, 0]} count={50} scale={15} size={4} speed={0.6} opacity={0.9} />
      
      {/* Enhanced Photo Frames */}
      {photos.map((photo) => (
        <PhotoFrame
          key={photo.title}
          position={photo.position}
          rotation={photo.rotation}
          imagePath={photo.previewImage}
          title={photo.title}
          onClick={() => setSelectedCategory(photo.title)}
          hovered={hovered}
          setHovered={setHovered}
          isMobile={isMobile}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />
      ))}
      
      {/* Enhanced Center Title with glow */}
      <Text
        position={[0, isMobile ? 2 : 3, 0]}
        fontSize={isMobile ? 0.3 : 0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Space Photo Studio
      </Text>
      
      {/* Enhanced Subtitle */}
      <Text
        position={[0, isMobile ? 1.5 : 2.5, 0]}
        fontSize={isMobile ? 0.15 : 0.2}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        Cosmic Photography
      </Text>
      
      {/* Enhanced Camera Controls */}
      <OrbitControls 
        enablePan={!isMobile}
        enableZoom={true}
        enableRotate={true}
        maxDistance={isMobile ? 25 : 20}
        minDistance={isMobile ? 10 : 5}
        autoRotate={true}
        autoRotateSpeed={isMobile ? 0.3 : 0.5}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={isMobile ? 0.5 : 1}
        zoomSpeed={isMobile ? 0.5 : 1}
      />
    </>
  )
}

// Enhanced Main Component with scrollable design
export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [show3DScene, setShow3DScene] = useState(true)
  
  const { playHoverSound, playClickSound, playSuccessSound, playAmbientSound } = useSoundEffects()

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset gallery index when category changes
  useEffect(() => {
    if (selectedCategory) {
      setCurrentGalleryIndex(0)
      playSuccessSound()
    }
  }, [selectedCategory, playSuccessSound])

  // Scroll detection for section highlighting and 3D scene control
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroSection = document.getElementById('hero')
      const gallerySection = document.getElementById('gallery')
      const aboutSection = document.getElementById('about')
      const contactSection = document.getElementById('contact')
      
      // Hide 3D scene when user scrolls down
      if (scrollPosition > 100) {
        setShow3DScene(false)
      } else {
        setShow3DScene(true)
      }
      
      if (heroSection && scrollPosition < heroSection.offsetHeight) {
        setActiveSection('hero')
      } else if (gallerySection && scrollPosition < gallerySection.offsetHeight + heroSection!.offsetHeight) {
        setActiveSection('gallery')
      } else if (aboutSection && scrollPosition < aboutSection.offsetHeight + gallerySection!.offsetHeight + heroSection!.offsetHeight) {
        setActiveSection('about')
      } else if (contactSection) {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const selectedCategoryData = selectedCategory ? galleryData[selectedCategory as keyof typeof galleryData] : null
  const currentImage = selectedCategoryData?.images[currentGalleryIndex]

  const nextImage = () => {
    if (selectedCategoryData) {
      setCurrentGalleryIndex((prev) => (prev + 1) % selectedCategoryData.images.length)
      playClickSound()
    }
  }

  const prevImage = () => {
    if (selectedCategoryData) {
      setCurrentGalleryIndex((prev) => (prev - 1 + selectedCategoryData.images.length) % selectedCategoryData.images.length)
      playClickSound()
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      playClickSound()
    }
  }

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SPS</span>
              </div>
              <span className="text-white font-bold text-lg">Space Photo Studio</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['hero', 'gallery', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={playHoverSound}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(!showStats)}
                className="text-white"
              >
                ☰
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col relative">
        {/* 3D Canvas - Fullscreen initially, hides on scroll */}
        <AnimatePresence>
          {show3DScene && (
            <motion.div
              className="fixed inset-0 z-10"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Canvas
                camera={{ position: [0, 0, isMobile ? 15 : 8], fov: isMobile ? 100 : 75 }}
                className="w-full h-full touch-none"
                style={{ 
                  background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)'
                }}
              >
                <Suspense fallback={
                  <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="#8b5cf6" />
                  </mesh>
                }>
                  <Scene 
                    setSelectedCategory={setSelectedCategory} 
                    isMobile={isMobile}
                    playHoverSound={playHoverSound}
                    playClickSound={playClickSound}
                  />
                </Suspense>
              </Canvas>
              
              {/* Mobile Touch Indicator */}
              {isMobile && (
                <motion.div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p className="text-white/80 text-xs">
                    👆 Touch & drag to explore
                  </p>
                </motion.div>
              )}
              
              {/* Scroll Hint */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-center">
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-xs">Scroll to explore more</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hero Content - Always visible but positioned under 3D scene */}
        <div className="flex-1 relative flex items-center justify-center min-h-screen">
          <div className="text-center z-0">
            <motion.h1 
              className="text-4xl md:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Space Photo Studio
            </motion.h1>
            <motion.p 
              className="text-lg md:text-2xl text-purple-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Cosmic Photography Redefined
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pointer-events-auto"
            >
              <Button 
                onClick={() => scrollToSection('gallery')}
                onMouseEnter={playHoverSound}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 text-lg rounded-full hover:scale-105 transition-transform"
              >
                Explore Gallery
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our curated collections of cosmic photography from across the universe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(galleryData).map(([category, data], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category)
                  playClickSound()
                }}
                onMouseEnter={playHoverSound}
              >
                <Card className="bg-black/80 border-white/20 backdrop-blur-sm overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
                      {category === 'Landscapes' && '🌌'}
                      {category === 'Portraits' && '👽'}
                      {category === 'Street' && '🚀'}
                      {category === 'Nature' && '🌟'}
                      {category === 'Architecture' && '🏗️'}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                    <p className="text-gray-300 text-sm mb-4">{data.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-sm font-medium">
                        {data.images.length} Photos
                      </span>
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About Space Photo Studio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pioneering cosmic photography with cutting-edge technology and artistic vision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We capture the beauty and wonder of the cosmos through innovative photography techniques. 
                    Specializing in space landscapes, alien portraits, and cosmic phenomena, we bring the 
                    universe closer to humanity through our lens.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Technology</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Quantum Camera X1', 'Neural Lightroom', 'Cosmic Photoshop', 'Starlight Editor'].map((tech) => (
                      <div key={tech} className="bg-white/10 rounded-lg p-3">
                        <span className="text-purple-400 font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: 'Photos Captured', value: '500+' },
                { label: 'Planets Visited', value: '47' },
                { label: 'Awards Won', value: '23' },
                { label: 'Happy Clients', value: '150+' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-purple-400 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to capture your cosmic moments? Reach out to us for bookings and collaborations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-black/80 border border-white/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400">📧</span>
                    <a href="mailto:hello@spacephotostudio.com" className="text-gray-300 hover:text-white transition-colors">
                      hello@spacephotostudio.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400">📱</span>
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400">📍</span>
                    <span className="text-gray-300">Orbital Station Alpha, Sector 7</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/80 border border-white/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {['📘', '🐦', '📷', '🎨'].map((icon, index) => (
                    <motion.button
                      key={icon}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={playClickSound}
                      className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl hover:bg-purple-500/20 transition-colors"
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/80 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:scale-105 transition-transform"
                      onClick={playClickSound}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-black border-t border-white/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SPS</span>
                </div>
                <h3 className="text-xl font-bold text-white">Space Photo Studio</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Capturing the cosmos through innovative photography and immersive experiences.
              </p>
              <div className="flex gap-4">
                {['📘', '🐦', '📷', '🎨'].map((icon) => (
                  <motion.button
                    key={icon}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={playClickSound}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                  >
                    <span className="text-lg">{icon}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Gallery', 'Services', 'Pricing', 'Blog'].map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                      onMouseEnter={playHoverSound}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">📧 hello@spacephotostudio.com</li>
                <li className="text-gray-400">📱 +1 (555) 123-4567</li>
                <li className="text-gray-400">📍 Orbital Station Alpha</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Space Photo Studio. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Designed by</span>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className="text-white text-sm font-medium">Eria Software</span>
                </div>
              </div>
              <div className="flex gap-6 text-gray-400 text-sm">
                {['Privacy', 'Terms', 'Cookies'].map((link) => (
                  <a 
                    key={link}
                    href="#" 
                    className="hover:text-white transition-colors"
                    onMouseEnter={playHoverSound}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
            <DialogContent className="bg-black/90 border-white/20 backdrop-blur-sm max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="text-white text-xl">
                  {selectedCategory} Gallery
                </DialogTitle>
              </DialogHeader>
              
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <img 
                    src={currentImage} 
                    alt={`${selectedCategory} ${currentGalleryIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    onClick={prevImage}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    ← Previous
                  </Button>
                  
                  <span className="text-white">
                    {currentGalleryIndex + 1} / {selectedCategoryData.images.length}
                  </span>
                  
                  <Button 
                    onClick={nextImage}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Next →
                  </Button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedCategoryData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentGalleryIndex(index)
                        playClickSound()
                      }}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentGalleryIndex ? 'border-purple-400' : 'border-white/20'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Description */}
                <div className="mt-4">
                  <h3 className="text-white font-semibold mb-2">{selectedCategory}</h3>
                  <p className="text-gray-300 text-sm">{selectedCategoryData.description}</p>
                  <p className="text-gray-400 text-xs mt-2">{selectedCategoryData.details}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-0 w-64 h-full bg-black/90 backdrop-blur-md border-l border-white/20 z-40 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold">Menu</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowStats(false)}
                className="text-white"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              {['hero', 'gallery', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section)
                    setShowStats(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}