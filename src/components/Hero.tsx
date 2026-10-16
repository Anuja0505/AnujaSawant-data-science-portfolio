import { Github, Linkedin, Mail, FolderGit2, Download, ArrowDown } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(personalInfo.resumePath);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Anuja_Sawant_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(personalInfo.resumePath, '_blank');
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <div className="max-w-3xl">
          <p className="text-sm md:text-base text-sky-400 font-medium tracking-wide mb-4 animate-fade-in-up">
            {personalInfo.headline}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 animate-fade-in-up animation-delay-100">
            {personalInfo.heroHeading}
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mb-8 animate-fade-in-up animation-delay-200">
            {personalInfo.heroIntro}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up animation-delay-300">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/25 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            >
              <FolderGit2 size={18} />
              View My Projects
            </button>
            <button
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 hover:border-sky-400/50 text-gray-200 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 animate-fade-in-up animation-delay-400">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 rounded-md p-1"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 rounded-md p-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50 rounded-md p-1"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-sky-400 transition-colors animate-bounce-slow"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
