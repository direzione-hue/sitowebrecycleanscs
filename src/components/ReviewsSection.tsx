import {MessageSquarePlus, Star} from 'lucide-react';
import type {ReviewItem} from '../types/recyclena';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onLeaveReview: () => void;
}

export function ReviewsSection({reviews, onLeaveReview}: ReviewsSectionProps) {
  return (
    <section id="recensioni" className="py-20 lg:py-28 bg-[#F6F7F5] text-[#111A15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#146C43] mb-2">
              Recensioni & Testimonianze
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111A15] [text-wrap:balance]">
              La parola a Comuni, strutture sanitarie, alberghi e imprese.
            </h2>
          </div>

          <button
            type="button"
            onClick={onLeaveReview}
            className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 text-sm font-medium text-[#111A15] bg-white hover:bg-[#ECEFEA] border border-[#111A15]/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43]"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#146C43]" aria-hidden="true" />
            <span>Lascia una Recensione</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white border border-[#111A15]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-[#546159]">
                    <span className="font-semibold text-[#146C43]">{review.sector}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{review.date}</span>
                  </div>
                  <div
                    className="flex items-center gap-0.5 text-[#B45309]"
                    aria-label={`Valutazione ${review.rating} su 5`}
                  >
                    {Array.from({length: 5}).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-[#B45309] text-[#B45309]' : 'text-[#D1D5DB]'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-base text-[#111A15] leading-relaxed">
                  “{review.quote}”
                </blockquote>

                <div className="text-xs text-[#49554E] bg-[#F6F7F5] rounded-lg p-3.5 space-y-1">
                  <div>
                    <span className="font-semibold text-[#111A15]">Esigenza: </span>
                    <span>{review.beforeContext}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#146C43]">Esito: </span>
                    <span>{review.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#111A15]/8">
                <div className="font-display text-sm font-bold text-[#111A15]">
                  {review.authorName}
                </div>
                <div className="text-xs text-[#546159]">
                  {review.role} · {review.organization}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
