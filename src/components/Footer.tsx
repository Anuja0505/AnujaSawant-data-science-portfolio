import { Github, Linkedin } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-white">{personalInfo.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Machine Learning &amp; Data Science
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
          </div>

          <p className="text-xs text-gray-600">&copy; {year} {personalInfo.name}</p>
        </div>
      </div>
    </footer>
  );
}
