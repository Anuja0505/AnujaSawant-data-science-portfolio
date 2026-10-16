import { ExternalLink, FolderGit2, CheckCircle2, Github, type LucideIcon } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="04" title="Featured Projects" />

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-12">
          {featured.map((project) => (
            <div
              key={project.title}
              className="group bg-[#111827] border border-white/5 rounded-xl overflow-hidden hover:border-sky-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 flex flex-col"
            >
              <div className="relative h-2 bg-gradient-to-r from-sky-500/60 to-violet-500/60" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <FolderGit2 size={20} className="text-sky-400" />
                  <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                {project.features.length > 0 && (
                  <ul className="space-y-1.5 mb-5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="text-sky-400/70 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-400 leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.context && (
                  <p className="text-xs text-violet-300/80 italic mb-4">{project.context}</p>
                )}

                {project.liveUrl && project.buttonLabel && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
                  >
                    {project.buttonLabel}
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Regular projects */}
        {regular.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mt-5 md:mt-6">
            {regular.map((project) => (
              <div
                key={project.title}
                className="group bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-sky-400/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  {(() => {
                    const Icon = (project as { projectIcon?: LucideIcon }).projectIcon || FolderGit2;
                    return <Icon size={18} className="text-sky-400" />;
                  })()}
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                {project.features.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="text-sky-400/70 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-400 leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.context && (
                  <p className="text-xs text-violet-300/80 italic mb-4">{project.context}</p>
                )}
                {project.liveUrl && project.buttonLabel && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    {project.buttonLabel}
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    View on GitHub
                    <Github size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
