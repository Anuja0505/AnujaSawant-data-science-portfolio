interface Props {
  sectionNumber: string;
  title: string;
}

export default function SectionHeading({ sectionNumber, title }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-mono text-sky-400">{sectionNumber}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}
