import { GraduationCap, Award } from 'lucide-react';
import { education, certifications } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="05" title="Education & Certifications" />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Education card */}
          <div className="md:col-span-1 bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-sky-400/20 transition-colors duration-200">
            <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
              <GraduationCap size={24} className="text-sky-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1 leading-snug">
              {education.degree}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{education.institution}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-mono text-sky-400">{education.duration}</span>
              <span className="text-gray-300">
                CGPA: <span className="text-white font-semibold">{education.cgpa}</span>
              </span>
            </div>
          </div>

          {/* Certifications */}
          <div className="md:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-3 bg-[#111827] border border-white/5 rounded-lg p-4 hover:border-sky-400/20 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-md bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <Award size={17} className="text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white leading-snug mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
