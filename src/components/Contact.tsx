import { Mail, Github, Linkedin, Phone } from 'lucide-react';
import { personalInfo, contactText } from '@/data/portfolioData';
import SectionHeading from './SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading sectionNumber="06" title={contactText.heading} />

        <div className="max-w-2xl mt-12">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10">
            {contactText.body}
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 p-4 bg-[#111827] border border-white/5 rounded-xl hover:border-sky-400/30 transition-colors duration-200 group"
            >
              <div className="w-11 h-11 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                <Mail size={20} className="text-sky-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm text-gray-200">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-4 p-4 bg-[#111827] border border-white/5 rounded-xl hover:border-sky-400/30 transition-colors duration-200 group"
            >
              <div className="w-11 h-11 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                <Phone size={20} className="text-sky-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                <p className="text-sm text-gray-200">{personalInfo.phone}</p>
              </div>
            </a>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#111827] border border-white/5 rounded-xl hover:border-sky-400/30 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                  <Github size={20} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">GitHub</p>
                  <p className="text-sm text-gray-200">View Profile</p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#111827] border border-white/5 rounded-xl hover:border-sky-400/30 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                  <Linkedin size={20} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">LinkedIn</p>
                  <p className="text-sm text-gray-200">View Profile</p>
                </div>
              </a>
            </div>
          </div>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/25 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
