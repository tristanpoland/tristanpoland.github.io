import Link from 'next/link';
import { ArrowRight, Terminal, Zap, Code2, GitFork, Boxes } from 'lucide-react';

const philosophyPoints = [
  {
    title: "Performance Bottlenecks",
    description: "Many existing tools were built when performance wasn't critical. Today's scale demands better.",
    icon: Zap
  },
  {
    title: "Modern Architecture",
    description: "Legacy systems often carry technical debt. Starting fresh enables clean, modern approaches.",
    icon: Boxes
  },
  {
    title: "Developer Experience",
    description: "Small friction points compound into significant productivity loss. Better tooling means faster development.",
    icon: Terminal
  }
];

const rustBenefits = [
  "Memory safety without runtime cost",
  "Predictable performance",
  "Built-in concurrency support",
  "Strong type system catching errors early"
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      <main className="max-w-6xl mx-auto py-16 px-6">
        {/* Hero Section */}
        <section className="mb-24">
          <h1 className="text-5xl font-bold text-blue-400 mb-8">
            The Philosophy Behind My Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            In software development, we often accept tools and systems as they are. 
            I believe in questioning and reimagining these foundations. Each project 
            represents an attempt to solve a fundamental problem in a more elegant, 
            efficient way.
          </p>
        </section>

        {/* Why Rebuild Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12">
            Why Rebuild What Already Exists?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyPoints.map((point, index) => (
              <div key={index} className="bg-gray-900/30 rounded-lg p-8 hover:bg-gray-900/50 transition-all">
                <point.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rust Advantage */}
        <section className="mb-24">
          <div className="bg-gray-900/30 rounded-lg p-12">
            <div className="flex items-start gap-6">
              <Code2 className="w-12 h-12 text-blue-400 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">The Rust Advantage</h2>
                <p className="text-gray-400 mb-8">
                  Many of my projects are built in Rust. This isn't just a technology 
                  choice—it's a philosophy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rustBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section className="mb-24">
          <div className="flex items-start gap-6">
            <GitFork className="w-12 h-12 text-blue-400 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Future</h2>
              <p className="text-gray-400 mb-8">
                I believe in open source as a vehicle for innovation. By sharing these tools, 
                I hope to inspire others to question existing solutions and build better 
                alternatives. The goal isn't just to create alternatives, but to push the 
                boundaries of what's possible in software development.
              </p>
              <Link 
                href="/projects"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Explore my projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}