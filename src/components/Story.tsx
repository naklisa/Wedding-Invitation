import { weddingConfig } from "../lib/config";
import { Heart } from "lucide-react";

export default function Story() {
  const { stories } = weddingConfig;

  return (
    <section id="kisah" className="relative px-6 py-14 text-center text-white">
      <div className="max-w-md mx-auto space-y-9">
        <div className="space-y-1">
          <p className="font-cinzel text-xs uppercase tracking-[0.35em] text-gold-300 font-semibold">
            Our Journey
          </p>
          <h3 className="font-script text-4xl sm:text-5xl text-gold-gradient">
            Kisah Cinta
          </h3>
          <p className="text-xs text-mauve-200 font-light">
            Bagaimana takdir mempertemukan dan menyatukan dua hati.
          </p>
        </div>

        {/* Timeline with Glowing Gold Spine */}
        <div className="relative border-l-2 border-gold-400/30 ml-4 sm:ml-6 space-y-7 text-left pl-6 sm:pl-8">
          {stories.map((story, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Heart Node */}
              <div className="absolute -left-[32px] sm:-left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#24131a] border-2 border-gold-300 text-gold-300 shadow-[0_0_12px_rgba(212,175,55,0.6)]">
                <Heart className="h-2.5 w-2.5 fill-gold-300" />
              </div>

              {/* Story Card */}
              <div className="luxury-card rounded-2xl p-4 sm:p-5 space-y-1.5 border border-gold-300/25 shadow-lg relative overflow-hidden group-hover:border-gold-300/50 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60" />
                
                <span className="inline-block rounded-full bg-gold-400/15 border border-gold-300/30 px-2.5 py-0.5 font-cinzel text-[10px] tracking-widest text-gold-200 uppercase font-semibold">
                  {story.date}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-white">
                  {story.title}
                </h4>
                <div className="text-xs text-mauve-100/95 font-light leading-relaxed whitespace-pre-line space-y-2 pt-1 font-sans">
                  {story.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
