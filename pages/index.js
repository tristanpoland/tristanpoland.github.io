import React, { useState } from 'react';
import Link from 'next/link';

const projects = [
  {
    title: "Horizon",
    description: "A sophisticated game server architecture built for UE5, featuring parent-child socket synchronization, near-zero latency optimization, and advanced coordinate management. Includes built-in monitoring tools and Docker support.",
    tags: ["Rust", "Docker", "WebSockets", "UE5"],
    link: "https://github.com/Stars-Beyond/Horizon-Community-Edition",
    features: [
      "Parent-Child socket synchronization",
      "Near-zero latency optimization",
      "Coordinate management and region mapping",
      "Event propagation system",
      "Docker containerization"
    ]
  },
  {
    title: "Viaduct CI",
    description: "Modern CI/CD pipeline server focusing on performance and developer experience, built with Rust and Actix-web.",
    tags: ["Rust", "SQLite", "Docker", "Git"],
    link: "https://github.com/ViaductCI/master",
    features: [
      "Asynchronous pipeline execution",
      "Efficient job management",
      "Built-in artifact storage",
      "RESTful API design",
      "Stateless architecture"
    ]
  },
  {
    title: "OmniForge",
    description: "Universal, open-source deployment platform for cloud-native applications with enterprise-grade security and 99.99% uptime.",
    tags: ["Rust", "Kubernetes", "Docker", "GitOps"],
    link: "https://github.com/tristanpoland/omniforge",
    features: [
      "Universal deployment across clouds",
      "Advanced container orchestration",
      "Service mesh integration",
      "Real-time monitoring",
      "Automated operations"
    ]
  },
  {
    title: "Occult UI",
    description: "Modern chat application for desktop implemented in Rust with a focus on security and performance.",
    tags: ["Rust", "UI", "WebRTC", "Encryption"],
    link: "https://github.com/tristanpoland/occult-ui",
    features: [
      "End-to-end encryption",
      "Real-time messaging",
      "Custom UI framework",
      "Cross-platform support",
      "Voice and video calls"
    ]
  },
  {
    title: "Grip",
    description: "Fast, user-friendly package manager that installs packages directly from GitHub releases with automatic PATH management.",
    tags: ["Rust", "CLI", "Package Management"],
    link: "https://github.com/Grip-Packages/Grip",
    features: [
      "Direct GitHub release installation",
      "Multiple registry support",
      "Automatic PATH management",
      "Cross-platform support",
      "Interactive UI"
    ]
  },
  {
    title: "Reaper Docs",
    description: "Secure documentation management system with authentication and role-based access control.",
    tags: ["Rust", "Rocket", "Markdown"],
    link: "https://github.com/tristanpoland/reaper-docs",
    features: [
      "Markdown document management",
      "User authentication",
      "Role-based access control",
      "Document search",
      "Metadata tracking"
    ]
  },
  {
    title: "Packer RS",
    description: "Rust wrapper around HashiCorp Packer CLI for seamless infrastructure automation.",
    tags: ["Rust", "HashiCorp", "Infrastructure"],
    link: "https://github.com/tristanpoland/packer-rs",
    features: [
      "Complete Packer CLI support",
      "Build automation",
      "Template management",
      "Plugin system",
      "Error handling"
    ]
  }
];

const experiences = [
  {
    title: "Co-Founder / Head of Projects",
    company: "Far Beyond LLC",
    period: "Jul 2024 - Present",
    type: "Freelance",
    location: "United States · Remote",
    description: "Leading startup initiatives and development of innovative software solutions.",
    tags: ["Start-up Leadership", "Software Development", "Team Management"]
  },
  {
    title: "Game Developer Engineer",
    company: "Unreal Kingdoms",
    period: "Dec 2023 - May 2024",
    type: "Contract",
    location: "United States · Remote",
    description: "Specialized in software design and infrastructure development.",
    tags: ["Software Design", "Software Infrastructure", "Game Development"]
  },
  {
    title: "Software and Cloud Engineer",
    company: "FiveTwenty Inc.",
    period: "May 2023 - Present",
    type: "Internship",
    location: "United States · Remote",
    description: "Contributing to application platforms and distributed systems, working with CloudFoundry, BOSH, Terraform, Vault, Consul, and Ruby on Rails. Supporting SaaS and application development solutions.",
    tags: ["CloudFoundry", "Terraform", "Ruby on Rails", "Distributed Systems"]
  },
  {
    title: "Chief Executive Officer",
    company: "Gameplex Software",
    period: "Mar 2019 - Sep 2024",
    type: "Full-time",
    location: "United States",
    description: "Leading software development and business strategy initiatives.",
    tags: ["Training", "Strategy", "Leadership", "Software Development"]
  }
];

const keyframes = `
  @keyframes wave {
    0% { transform: rotate(0deg); }
    10% { transform: rotate(14deg); }
    20% { transform: rotate(-8deg); }
    30% { transform: rotate(14deg); }
    40% { transform: rotate(-4deg); }
    50% { transform: rotate(10deg); }
    60% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }
`;

const Portfolio = () => {
  const [selectedSection, setSelectedSection] = useState('projects');

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <style>{keyframes}</style>
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="mb-24">
          <h1 className="text-5xl font-bold text-blue-400 mb-6">
            Hey, I'm Tristan{' '}
            <span className="inline-block" style={{ animation: 'wave 2.5s ease-in-out infinite', transformOrigin: '70% 70%' }}>
              👋
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl">
            Full-stack developer focused on building innovative game server solutions and open-source tools.
          </p>
          <div className="flex gap-4">
            <Link href="/blog" className="px-6 py-3 bg-blue-900/30 rounded-lg text-blue-400 hover:bg-blue-900/50 transition-colors">
              Read My Blog
            </Link>
            <Link href="https://github.com/tristanpoland" className="px-6 py-3 bg-gray-900/30 rounded-lg text-gray-300 hover:bg-gray-900/50 transition-colors">
              View GitHub
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setSelectedSection('projects')}
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'projects' 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'text-gray-400 hover:bg-gray-900/30'
              }`}
            >
              Projects
            </button>
            <button 
              onClick={() => setSelectedSection('experience')}
              className={`px-4 py-2 rounded-lg ${
                selectedSection === 'experience' 
                  ? 'bg-blue-900/30 text-blue-400' 
                  : 'text-gray-400 hover:bg-gray-900/30'
              }`}
            >
              Experience
            </button>
          </div>

          {selectedSection === 'projects' && (
            <div className="grid gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-900/30 rounded-lg p-8 hover:bg-gray-900/50 transition-colors">
                  <Link href={project.link} className="block">
                    <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {selectedSection === 'experience' && (
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <div key={index} className="bg-gray-900/30 rounded-lg p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-1">{experience.title}</h3>
                      <p className="text-blue-400">{experience.company} · {experience.type}</p>
                    </div>
                    <span className="text-gray-400">{experience.period}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{experience.description}</p>
                  <p className="text-gray-400 mb-4">{experience.location}</p>
                  <div className="flex flex-wrap gap-3">
                    {experience.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-900/30 rounded-full text-blue-400 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Portfolio;