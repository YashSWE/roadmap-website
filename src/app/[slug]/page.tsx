import { Metadata } from "next";
import { chapters, blocks } from "@/content/roadmap";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { StatusChip } from "@/components/StatusChip";
import { SyllabusList } from "@/components/SyllabusList";
import { ChapterProgress } from "@/components/ChapterProgress";
import Link from "next/link";

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return {};
  
  return {
    title: `${chapter.title} — The Behumoury Roadmap`,
    description: chapter.summary,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapterIndex = chapters.findIndex((c) => c.slug === slug);
  if (chapterIndex === -1) {
    notFound();
  }
  const chapter = chapters[chapterIndex];
  const block = blocks.find((b) => b.id === chapter.block);

  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#F3F1EA] text-[#0A0A0A] flex flex-col relative font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(10,10,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <TopBar variant="chapter" />

      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 md:py-20 relative z-10 flex flex-col gap-12">
        <header className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/60">
            ROADMAP / {block ? `BLOCK ${block.id}` : 'OVERVIEW'} / CH. {chapter.number.toString().padStart(2, '0')}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-anton text-5xl md:text-7xl uppercase leading-[0.85] tracking-tight">
              {chapter.title}
            </h1>
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest">
              <StatusChip status={chapter.status} publishDate={chapter.publishDate} />
            </div>
          </div>

          <ChapterProgress chapterSlug={chapter.slug} />
        </header>

        {/* Video Slot */}
        <section>
          {chapter.status === "published" && chapter.youtubeId ? (
            <div className="w-full aspect-video border border-[#0A0A0A] bg-[#0A0A0A] shadow-[4px_4px_0_#0A0A0A] relative flex items-center justify-center cursor-pointer group">
              <a href={`https://youtube.com/watch?v=${chapter.youtubeId}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-12 bg-[#FF0000] flex items-center justify-center rounded-lg mb-2">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="font-mono text-[#FFFFFF] text-xs">WATCH ON YOUTUBE</p>
              </a>
            </div>
          ) : (
            <div className="border border-[#0A0A0A] bg-[#0A0A0A] text-[#FFFFFF] p-6 shadow-[4px_4px_0_#0A0A0A] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-xl">
                <h2 className="font-anton text-3xl uppercase tracking-tight">
                  {chapter.status === "coming-soon" && chapter.publishDate ? `VIDEO DROPS ${new Date(chapter.publishDate).toLocaleString("default", { month: "short" }).toUpperCase()} ${new Date(chapter.publishDate).getDate()}` : "VIDEO IN PRODUCTION"}
                </h2>
                <p className="font-sans text-sm text-[#FFFFFF]/80">
                  This chapter is complete — everything below is ready to learn right now. The video companion walks through all of it, plus the build, when it lands.
                </p>
              </div>
              <a href="https://youtube.com/@behumoury" target="_blank" rel="noopener noreferrer" className="bg-[#C6FF3F] text-[#0A0A0A] font-mono text-sm uppercase px-6 py-3 tracking-widest font-bold whitespace-nowrap hover:bg-[#b0f224] transition-colors border border-[#0A0A0A] inline-block text-center">
                SUBSCRIBE ↗
              </a>
            </div>
          )}
        </section>

        {/* Syllabus */}
        {chapter.groups.length > 0 && (
          <section className="flex flex-col gap-8">
            {chapter.groups.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {group.label && (
                  <h3 className="font-mono text-sm uppercase tracking-widest text-[#0A0A0A]/60">
                    {group.label}
                  </h3>
                )}
                <div className="flex flex-col border-t border-[#0A0A0A]">
                  <SyllabusList topics={group.topics} chapterSlug={chapter.slug} />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Interview Questions */}
        {chapter.interviewQuestions.length > 0 && (
          <section className="border border-[#0A0A0A] bg-[#FFFFFF] shadow-[4px_4px_0_#0A0A0A] p-6 flex flex-col gap-6">
            <h3 className="font-mono text-sm uppercase tracking-widest">
              INTERVIEW QUESTIONS THIS CHAPTER ANSWERS
            </h3>
            <div className="flex flex-col gap-4">
              {chapter.interviewQuestions.map((q, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="font-mono text-xs text-[#0A0A0A]/50 mt-1">
                    Q{idx + 1}
                  </span>
                  <p className="font-sans text-base leading-relaxed">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* Prev / Next */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#0A0A0A] pt-8 mt-4">
          {prevChapter ? (
            <Link href={`/${prevChapter.slug}`} className="font-mono text-sm uppercase tracking-widest hover:text-[#3D5AFE] transition-colors self-start sm:self-auto">
              ← CH. {prevChapter.number.toString().padStart(2, '0')} {prevChapter.title.split(':')[0]}
            </Link>
          ) : <div />}
          
          {nextChapter ? (
            <Link href={`/${nextChapter.slug}`} className="font-mono text-sm uppercase tracking-widest hover:text-[#3D5AFE] transition-colors self-end sm:self-auto text-right">
              CH. {nextChapter.number.toString().padStart(2, '0')} {nextChapter.title.split(':')[0]} →
            </Link>
          ) : <div />}
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
