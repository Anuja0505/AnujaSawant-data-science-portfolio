import { CheckCircle2 } from 'lucide-react';
import { personalInfo, aboutHighlights } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="01" title="About Me" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12">
          <div className="md:col-span-2">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {personalInfo.about}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
              Focus Areas
            </h3>
            {aboutHighlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={18}
                  className="text-sky-400 flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
