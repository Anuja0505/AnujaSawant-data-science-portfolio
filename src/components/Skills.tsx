import { skillCategories } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="02" title="Technical Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-12">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="bg-[#111827] border border-white/5 rounded-xl p-6 hover:border-sky-400/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <Icon size={20} className="text-sky-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-md hover:border-sky-400/30 hover:text-sky-300 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
