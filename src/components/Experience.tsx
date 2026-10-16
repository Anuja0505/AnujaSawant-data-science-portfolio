import { Briefcase } from 'lucide-react';
import { experiences } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="03" title="Experience" />

        <div className="mt-12 max-w-3xl">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-10 pb-12 last:pb-0">
              {/* Timeline line */}
              {idx < experiences.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/10" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center">
                <Briefcase size={15} className="text-sky-400" />
              </div>

              <div className="bg-[#111827] border border-white/5 rounded-xl p-5 md:p-6 hover:border-sky-400/20 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                  <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-sky-400">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{exp.organization}</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-sky-400 mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-sky-400" />
                      <span className="text-sm text-gray-300 leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
