import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Briefcase, GraduationCap, Award, Book, Code, Coffee } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'experience' | 'education' | 'award';
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function LuxuryAboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  const [activeTab, setActiveTab] = useState<'bio' | 'timeline' | 'personal'>('bio');
  const [hoverPoint, setHoverPoint] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      year: '2022',
      title: 'Senior Software Engineer',
      description: 'Led development of enterprise applications using React and Node.js at Tech Corp.',
      icon: <Briefcase className="w-5 h-5" />,
      category: 'experience'
    },
    {
      year: '2020',
      title: 'Full Stack Developer',
      description: 'Developed and maintained multiple client projects at Digital Solutions Inc.',
      icon: <Code className="w-5 h-5" />,
      category: 'experience'
    },
    {
      year: '2019',
      title: 'Master\'s in Computer Science',
      description: 'Specialized in Software Engineering at Tech University.',
      icon: <GraduationCap className="w-5 h-5" />,
      category: 'education'
    },
    {
      year: '2018',
      title: 'Excellence in Development Award',
      description: 'Recognized for outstanding contributions to open source projects.',
      icon: <Award className="w-5 h-5" />,
      category: 'award'
    }
  ];
  
  // Personal details
  const personalDetails = [
    { icon: <Calendar className="w-5 h-5" />, label: "Birthday", value: "May 15, 1995" },
    { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "San Francisco, CA" },
    { icon: <Book className="w-5 h-5" />, label: "Languages", value: "English, Tamil, Hindi" },
    { icon: <Coffee className="w-5 h-5" />, label: "Interests", value: "Photography, Swimming, Chess" },
  ];
  
  // Skills data
  const skills: Skill[] = [
    { name: "JavaScript", level: 92, category: "Frontend" },
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 78, category: "Backend" },
    { name: "AWS", level: 80, category: "DevOps" },
    { name: "UI/UX Design", level: 75, category: "Design" }
  ];
  
  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Handle mouse movement for lighting effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setHoverPoint({ x, y });
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full py-20 px-4 md:px-8 overflow-visible bg-gradient-to-br from-gray-900 to-gray-800"
      onMouseMove={handleMouseMove}
      style={{ zIndex: 1 }} // Ensure proper stacking context
    >
      {/* Dynamic lighting effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(circle at ${hoverPoint.x}% ${hoverPoint.y}%, rgba(79, 70, 229, 0.1), transparent 80%)`,
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bg-element-${i}`}
            className="absolute rounded-full bg-indigo-900/10 blur-3xl"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
            }}
            animate={{
              x: [
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 30 : 70)}%`,
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 70 : 30)}%`,
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 30 : 70)}%`
              ],
              y: [
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 30 : 70)}%`,
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 40 : 60)}%`,
                `${Math.random() * 20 - 10 + (i % 2 === 0 ? 30 : 70)}%`
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 50 + i * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={controls}
          variants={{
            visible: { 
              opacity: 1,
              transition: { duration: 0.8 }
            }
          }}
          className="mb-12 text-center"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block pb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Main content card with glass effect */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
          style={{
            boxShadow: "0 20px 80px -20px rgba(79, 70, 229, 0.4)"
          }}
        >
          <div className="md:flex">
            {/* Left column: Photo and tabs */}
            <div className="md:w-1/3">
              {/* Profile image container with premium border effect */}
              <div className="relative p-5">
                <motion.div 
                  className="relative rounded-xl overflow-hidden aspect-[3/4] border-2 border-white/10"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"
                      animate={{
                        background: [
                          'linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)',
                          'linear-gradient(to right, #ec4899, #4f46e5, #7e22ce)',
                          'linear-gradient(to right, #7e22ce, #ec4899, #4f46e5)',
                          'linear-gradient(to right, #4f46e5, #7e22ce, #ec4899)',
                        ],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  
                  {/* Photo with parallax effect */}
                  <div className="absolute inset-[3px] bg-gray-900 rounded-lg overflow-hidden">
                    <motion.img 
                      src="WhatsApp Image 2025-04-17 at 2.40.52 AM.jpeg"
                      alt="Kirthik Ramadoss"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">Kirthik Ramadoss</h3>
                      <p className="text-sm text-indigo-300 font-medium">Software Engineer</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Navigation tabs */}
              <div className="px-5 pb-5">
                <div className="flex flex-col space-y-2">
                  {[
                    { id: 'bio', label: 'Biography' },
                    { id: 'timeline', label: 'Experience' },
                    { id: 'personal', label: 'Personal' },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-white shadow-lg'
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                      whileHover={{
                        x: activeTab !== tab.id ? 5 : 0,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column: Content based on active tab */}
            <div className="md:w-2/3 p-6 md:p-10">
              <AnimatePresence mode="wait">
                {activeTab === 'bio' && (
                  <motion.div
                    key="bio"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      My Journey
                    </h3>
                    
                    <div className="space-y-4 text-gray-300">
                      <motion.p 
                        className="leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        With over 5 years of experience in software engineering, I've cultivated expertise in building sophisticated, 
                        scalable web applications that prioritize both technical excellence and user experience.
                      </motion.p>
                      
                      <motion.p 
                        className="leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        My approach combines innovative problem-solving with meticulous attention to detail, 
                        allowing me to architect solutions that not only meet technical requirements but exceed client expectations.
                      </motion.p>
                      
                      <motion.p 
                        className="leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        I'm passionate about leveraging cutting-edge technologies to create digital experiences that 
                        are both beautiful and functional, with a particular focus on React, TypeScript, and cloud architecture.
                      </motion.p>
                      
                      <motion.div
                        className="pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <h4 className="text-xl font-semibold mb-3 text-indigo-300">Technical Expertise</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['Front-end Architecture', 'State Management', 'Performance Optimization', 'UI/UX Design', 'API Design', 'Cloud Infrastructure'].map((skill, index) => (
                            <motion.div 
                              key={skill}
                              className="bg-white/5 rounded-lg px-3 py-2 text-sm border border-white/5"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(255, 255, 255, 0.1)" 
                              }}
                            >
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Experience & Education
                    </h3>
                    
                    {/* Skills visualization */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4 text-indigo-300">Skills</h4>
                      <div className="grid gap-4">
                        {skills.map((skill, index) => (
                          <motion.div 
                            key={skill.name}
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                              <span className="text-xs font-medium text-indigo-300">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ width: "0%" }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Timeline events */}
                    <h4 className="text-xl font-semibold mb-4 text-indigo-300">Timeline</h4>
                    <div className="space-y-8">
                      {timelineEvents.map((event, index) => (
                        <motion.div 
                          key={event.title}
                          className="relative pl-8 border-l border-indigo-500/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * index, duration: 0.5 }}
                        >
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-gray-900" />
                          <div className="absolute left-[-16px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-900/40 text-white">
                            {event.icon}
                          </div>
                          <h5 className="text-lg font-bold text-white">{event.title}</h5>
                          <p className="text-sm text-indigo-300 mb-1">{event.year}</p>
                          <p className="text-gray-400">{event.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'personal' && (
                  <motion.div
                    key="personal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Personal Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {personalDetails.map((detail, index) => (
                        <motion.div 
                          key={detail.label}
                          className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                          <div className="p-2.5 rounded-full bg-indigo-500/20 text-indigo-400">
                            {detail.icon}
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">{detail.label}</p>
                            <p className="font-medium text-white">{detail.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-indigo-300">About Me</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Beyond coding, I'm an avid photographer who loves capturing landscapes and street scenes.
                        I enjoy swimming as a way to stay active and clear my mind, and I'm a dedicated chess player
                        who appreciates the game's strategic complexity. These diverse interests help me maintain
                        balance and bring fresh perspectives to my technical work.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-indigo-300">Philosophy</h4>
                      <div className="relative p-6 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-lg border border-indigo-500/20">
                        <div className="absolute -top-3 -left-2 text-4xl text-indigo-500 opacity-50">"</div>
                        <p className="text-gray-300 italic">
                          I believe in creating technology that not only solves problems but enhances lives.
                          My goal is to build software that feels intuitive and brings joy to its users while
                          pushing the boundaries of what's technically possible.
                        </p>
                        <div className="absolute -bottom-3 -right-2 text-4xl text-indigo-500 opacity-50">"</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
