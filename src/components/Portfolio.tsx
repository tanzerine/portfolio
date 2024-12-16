'use client'
import { useState, useEffect } from 'react'
import { Project, Position, TechCategory, TECH_COLORS } from '@/types/project'
import { projects } from '@/data/projects'
import React from 'react';
import Image from 'next/image';
import tylLogo from '../components/tyl_logo.png';
import dropdownIcon from '../components/dropdown.png';
import hambergerIcon from '../components/hamberger.png';
import name from '../components/name.png';


export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechCategory | null>(null);

  const ANIMATION_DELAY = 100;
  const BASE_Z_INDEX = 10; // Base z-index for all projects
  const HOVER_Z_INDEX = 20; // Higher z-index for hovered project

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsHamburgerOpen(false);
    setSelectedProject(null);
  };

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsDropdownOpen(false);
    setSelectedProject(null);
  };


  const handleTechSelect = (tech: TechCategory) => {
    console.log('Tech selected:', tech);
    setSelectedTech(prevTech => {
      console.log('Previous tech:', prevTech, 'New tech:', tech);
      return prevTech === tech ? null : tech;
    });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsHamburgerOpen(false);
    setIsDropdownOpen(false);
  };
  
  const aboutContent = {
    title: "About",
    location: "Currently living in Seoul",
    contact: [
      "Mobile: +82 010-4858-0265",
      "Email: tylee1171@snu.ac.kr"
    ],
    experience: [
      "2019 Visual Design Major, Department of Design, Seoul National University",
      "2020 Full-stack Development of QUO, a Data Visualization-based Diary Application (Patent Holder)",
      "2021 Completed Entrepreneurship Courses: 'IT Entrepreneurship', 'Design Business'",
      "2021 Member of Seoul National University Startup Club 'Melting Pot'",
      "2021 Intern at Samsung C-LAB 'PetNow'",
      "2021 Selected for Art Trading Platform Project in Club Pitching, Led Initial Team Building",
      "2021 Early-stage Member & Branding/Marketing Team Lead at EduTech Startup 'Pacemaker'",
      "2022 Founded Art Trading Platform 'Fragile'",
      "2023 UI Design & Design Research for Corporate Video Education Platform 'UBob'"
    ],
    awards: [
      "2022 'PetNow' CES Best Innovation Award",
      "2023 Naver Excellence Award at Seoul National University Design Department Graduation Exhibition"
    ]
  };

  const menuItems: TechCategory[] = [
    'Design',
    'Product',
    'Business',
    'Development',
    'Marketing',
    'Experimental',
    'Else'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const positions: Position[] = [
    { top: 200, left: 130 },  // Reduced left positions to fit in left half
    { top: 0, left: 330 },
    { top: 340, left: 170 },
    { top: 420, left: 570 },
    { top: 70, left: 50 },
    { top: 440, left: 90 },
    { top: 300, left: 610 },
    { top: 150, left: 30 },
    { top: 100, left: 120 },
    { top: 30, left: 70 }
  ];

  const calculatePosition = (index: number): Position => {
    return positions[index % positions.length];
  };

  const resumeContent = {
    name: "TaeYoon Lee",
    title: "Creative Developer & Designer",
    summary: "Passionate about creating innovative digital experiences that combine technology and design.",
    experience: [
      {
        role: "Senior Creative Developer",
        company: "Digital Innovation Co",
        period: "2020 - Present",
        description: "Led creative development for major client projects, combining technical expertise with design thinking."
      },
      {
        role: "UX Engineer",
        company: "Tech Solutions Inc",
        period: "2018 - 2020",
        description: "Bridged the gap between design and development, creating seamless user experiences."
      }
    ],
    skills: [
      "Creative Development",
      "Interactive Design",
      "UX/UI Design",
      "Front-end Development",
      "Three.js",
      "WebGL",
      "React",
      "TypeScript"
    ],
    education: {
      degree: "Bachelor of Design in Interactive Digital Media",
      school: "Design University",
      year: "2018"
    }
  };

  const techCategories = [
    'Design',
    'Product',
    'Business',
    'Development',
    'Marketing',
    'Experimental',
    'Else'
  ];


  const getProjectStyle = (
    project: Project,
    position: Position,
    tech: TechCategory,
    techIndex: number
  ): React.CSSProperties => {
    const finalWidth = project.size.width + (project.technologies.length - techIndex) * 10;
    const finalHeight = project.size.height + (project.technologies.length - techIndex) * 10;
    const finalTop = position.top - (project.technologies.length - techIndex) * 5;
    const finalLeft = position.left - (project.technologies.length - techIndex) * 5;
    const isHovered = hoveredId === project.id;
    const isTechHighlighted = selectedTech === tech;

    if (isAnimating) {
      return {
        backgroundColor: TECH_COLORS[tech],
        width: 0,
        height: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        zIndex: BASE_Z_INDEX + techIndex,
        borderRadius: '50%',
        opacity: 1,
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, width, height',
      };
    }

    return {
      backgroundColor: selectedTech ? (isTechHighlighted ? TECH_COLORS[tech] : '#CCCCCC') : TECH_COLORS[tech],
      width: finalWidth,
      height: finalHeight,
      top: finalTop,
      left: finalLeft,
      position: 'absolute',
      zIndex: isTechHighlighted ? HOVER_Z_INDEX + techIndex : BASE_Z_INDEX + techIndex,
      borderRadius: 100 + (project.technologies.length - techIndex) * 4,
      opacity: selectedTech ? (isTechHighlighted ? 1 : 0.3) : 0.7,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, background-color, opacity',
      transform: isHovered || isTechHighlighted ? 'scale(1.02)' : 'scale(1)',
    };
  };

  
  const getGreyBoxStyle = (
    project: Project,
    position: Position
  ): React.CSSProperties => {
    const width = project.size.width + project.technologies.length * 10;
    const height = project.size.height + project.technologies.length * 10;
    const top = position.top - project.technologies.length * 5;
    const left = position.left - project.technologies.length * 5;
    const isHovered = hoveredId === project.id;

    if (isAnimating) {
      return {
        backgroundColor: '#ff2e18',
        width: 0,
        height: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        zIndex: BASE_Z_INDEX - 1,
        borderRadius: '50%',
        opacity: 1,
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, width, height',
      };
    }

    return {
      backgroundColor: '#f9f9f9',
      width,
      height,
      top,
      left,
      position: 'absolute',
      zIndex: BASE_Z_INDEX - 1,
      borderRadius: 100 + project.technologies.length * 4,
      opacity: 1,
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform',
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    };
  };

  const getWhiteBoxStyle = (
    project: Project,
    position: Position,
  ): React.CSSProperties => {
    const isHovered = hoveredId === project.id;
    const baseZIndex = BASE_Z_INDEX + project.technologies.length + 10; // Ensure it's above tech layers
    const hoverZIndex = HOVER_Z_INDEX + project.technologies.length + 10;
  
    if (isAnimating) {
      return {
        width: 0,
        height: 0,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 1,
        zIndex: isHovered ? hoverZIndex : baseZIndex,
        borderRadius: '100px',
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'auto' as const,
        backgroundColor: 'white', // Add background color
      };
    }
  
    const scale = isHovered ? 'scale(1.05)' : 'scale(1)';
    return {
      width: project.size.width,
      height: project.size.height,
      top: position.top,
      left: position.left,
      transform: scale,
      opacity: 1,
      zIndex: isHovered ? hoverZIndex : baseZIndex,
      borderRadius: '100px',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'auto' as const,
      backgroundColor: 'white', // Add background color
    };
  };

  return (
    <div className="min-h-screen bg-white p-10 relative">
      {/* Right Panel - Always visible */}
      <div className="fixed right-0 top-0 w-1/2 h-screen bg-[#FF2E18] overflow-hidden z-40">
        <div className="relative h-full">
        <div 
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              isDropdownOpen 
                ? 'translate-y-0 opacity-100 z-50' 
                : '-translate-y-full opacity-0 -z-10'
            }`}
          >
            <div className="h-full overflow-y-auto scrollbar-hide">
              <div className="py-40 px-20">
                <h2 className="text-5xl font-light text-black mb-8">{aboutContent.title}</h2>
                
                {/* Location */}
                <p className="text-lg text-black/90 mb-4">{aboutContent.location}</p>
                
                {/* Contact Info */}
                <div className="mb-12">
                  {aboutContent.contact.map((info, index) => (
                    <p key={index} className="text-base font-medium text-black/90">
                      {info}
                    </p>
                  ))}
                </div>
                
                {/* Experience Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-black mb-6">Experience</h3>
                  <div className="space-y-2">
                    {aboutContent.experience.map((item, index) => (
                      <p key={index} className="text-lg text-black/90">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                
                {/* Awards Section */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-black mb-6">Awards</h3>
                  <div className="space-y-2">
                    {aboutContent.awards.map((award, index) => (
                      <p key={index} className="text-lg text-black/90">
                        {award}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              isHamburgerOpen 
                ? 'translate-y-0 opacity-100 pointer-events-auto' 
                : '-translate-y-full opacity-0 pointer-events-none'
            }`}
          >
            <div className="py-40 px-20">
              <nav className="space-y-8">
                {menuItems.map((tech: TechCategory) => (
                  <button
                    key={tech}
                    onClick={() => {
                      console.log('Clicking:', tech);
                      handleTechSelect(tech);
                      // Optionally close the hamburger menu after selection
                      // setIsHamburgerOpen(false);
                    }}
                    className="w-full flex items-center gap-4 text-3xl font-light bg-transparent border-0 cursor-pointer group hover:translate-x-2 transition-all duration-300"
                    style={{ 
                      color: selectedTech === tech ? TECH_COLORS[tech] : 'rgba(0,0,0,0.9)',
                    }}
                  >
                    <span 
                      className="w-4 h-4 rounded-full transition-all duration-300 shrink-0"
                      style={{ 
                        backgroundColor: TECH_COLORS[tech],
                        opacity: selectedTech === tech ? 1 : 0.7,
                        transform: `scale(${selectedTech === tech ? 1.2 : 1})`,
                      }}
                    />
                    <span className="select-none">{tech}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Project Content */}
          <div 
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              selectedProject && !isDropdownOpen && !isHamburgerOpen
                ? 'translate-y-0 opacity-100 z-50'
                : 'translate-y-full opacity-0 -z-10'
            }`}
          >
            {selectedProject && (
              <div className="py-40 px-20">
                <h2 className="text-5xl font-light text-black mb-2">{selectedProject.name}</h2>
                <p className="text-sm font-mono text-black/70 mb-12">
                  {selectedProject.size.width} × {selectedProject.size.height} pixels
                </p>
                <p className="text-lg text-black/90 leading-relaxed mb-16 font-light whitespace-pre-line">
                  {selectedProject.description}
                </p>
                <div className="border-t border-black/10 pt-8">
                  <h3 className="text-xs uppercase tracking-widest text-black/50 mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: TechCategory) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: TECH_COLORS[tech], opacity: 0.9 }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto">
        <div className="mb-20 flex justify-between items-start relative z-50">
          <Image 
            src={tylLogo}
            alt="TYL"
            className="h-20 w-auto"
            width={120}
            height={60}
          />
          <div className="flex items-center gap-8 ">
            <Image 
              src={dropdownIcon}
              alt="Diamond icon"
              className={`w-auto h-6 cursor-pointer  px-100 transition-transform duration-300  ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              width={16}
              height={16}
              onClick={handleDropdownClick}
            />
            <Image 
              src={hambergerIcon}
              alt="Menu"
              className={`w-auto h-18 cursor-pointer transition-transform duration-300 ${
                isHamburgerOpen ? 'rotate-45' : ''
              }`}
              width={16}
              height={16}
              onClick={handleHamburgerClick}
            />
          </div>
        </div>

        {/* Main Design */}
        <div className="relative w-full h-[800px] mb-20 z-0">
          {/* Project Boxes */}
          {projects.map((project: Project, index: number) => {
            const position = calculatePosition(index);
            
            return (
              <div key={project.id}>
                {/* Grey background layer */}
                <div
                  className="absolute"
                  style={getGreyBoxStyle(project, position)}
                />

                {/* Technology color layers */}
                {project.technologies.map((tech: TechCategory, techIndex: number) => (
                  <div
                    key={`${project.id}-${tech}`}
                    className="absolute"
                    style={getProjectStyle(project, position, tech, techIndex)}
                  />
                ))}

{/* White project box */}
<div
  className="absolute cursor-pointer bg-white overflow-hidden" // Added overflow-hidden
  style={getWhiteBoxStyle(project, position)}
  onMouseEnter={() => setHoveredId(project.id)}
  onMouseLeave={() => setHoveredId(null)}
  onClick={() => handleProjectClick(project)}
>
  {/* Project info on hover */}
  {hoveredId === project.id && (
    <div 
      className="absolute inset-0 p-6 flex flex-col justify-center items-center bg-white/90 rounded-[100px]" // Added rounded-[100px]
    >
      <h3 className="font-bold text-xl mb-2 text-center">{project.name}</h3>
      <p className="text-sm text-gray-600 text-center">
        {project.size.width} × {project.size.height}
      </p>
    </div>
  )}
</div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end" style={{ fontFamily: 'Press Start 2P, monospace' }}>
          <div className="flex justify-center">
          <Image 
          src={name}
          alt="Checkerboard icon"
          className="w-auto h-19"
          width={32}
          height={32}
        />
        </div>
        <div className="text-xs space-y-1 text-right">
            {(Object.entries(TECH_COLORS) as [TechCategory, string][]).map(([tech, color]) => (
              <p key={tech} style={{ color }}>{tech.toUpperCase()}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}