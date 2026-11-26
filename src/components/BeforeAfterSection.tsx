import {useEffect, useRef, useState} from 'react';
import {MoveHorizontal} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import type {BeforeAfterProject} from '../types/recyclena';
import {clampSliderPosition} from '../utils/portfolioLogic';
import {ResilientImage} from './ResilientImage';

interface BeforeAfterSectionProps {
  projects: BeforeAfterProject[];
}

export function BeforeAfterSection({projects}: BeforeAfterSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id ?? '');
  const [sliderPos, setSliderPos] = useState<number>(52);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projects.some((p) => p.id === selectedId) && projects.length > 0) {
      setSelectedId(projects[0].id);
    }
  }, [projects, selectedId]);

  const activeProject =
    projects.find((item) => item.id === selectedId) ?? projects[0];

  const updateFromClientX = (clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(clampSliderPosition(rawPercent));
  };

  useEffect(() => {
    if (!isDragging) return;
    const handlePointerMove = (event: PointerEvent) => {
      updateFromClientX(event.clientX);
    };
    const handlePointerUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging]);

  if (!activeProject) {
    return null;
  }

  return (
    <section
      id="prima-dopo"
      className="py-20 lg:py-28 bg-white text-[#111A15] border-y border-[#111A15]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-[#146C43] mb-2">
            Risultati Verificabili · Prima & Dopo
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111A15] [text-wrap:balance]">
            Trasformazioni reali su cantieri, parchi e strutture.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div
              ref={stageRef}
              data-testid="before-after-stage"
              onPointerDown={(e) => {
                setIsDragging(true);
                updateFromClientX(e.clientX);
              }}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#17251E] select-none touch-none cursor-ew-resize border border-[#111A15]/12"
            >
              {/* After layer (full base) */}
              <div className="absolute inset-0">
                <ResilientImage
                  src={activeProject.afterImageUrl}
                  alt={`Dopo l'intervento: ${activeProject.title}`}
                  fallbackTitle={activeProject.afterLabel || 'Dopo'}
                />
              </div>

              {/* Before layer (clipped horizontally by sliderPos) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{clipPath: `inset(0 ${100 - sliderPos}% 0 0)`}}
              >
                <ResilientImage
                  src={activeProject.beforeImageUrl}
                  alt={`Prima dell'intervento: ${activeProject.title}`}
                  fallbackTitle={activeProject.beforeLabel || 'Prima'}
                />
              </div>

              {/* Labels with high-contrast backing */}
              <div className="pointer-events-none absolute top-4 left-4 z-10 px-3 py-1.5 rounded-md bg-black/75 text-white text-xs font-medium backdrop-blur-xs">
                {activeProject.beforeLabel || 'Prima'}
              </div>
              <div className="pointer-events-none absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md bg-[#146C43]/90 text-white text-xs font-medium backdrop-blur-xs">
                {activeProject.afterLabel || 'Dopo'}
              </div>

              {/* Divider handle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 z-20 w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]"
                style={{left: `${sliderPos}%`, transform: 'translateX(-50%)'}}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#111A15] shadow-md flex items-center justify-center border border-[#111A15]/15">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Accessible range bar & quick presets */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F6F7F5] px-4 py-3 rounded-xl border border-[#111A15]/10">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <label
                  htmlFor="before-after-range"
                  className="text-xs font-medium text-[#3F4A43] whitespace-nowrap"
                >
                  Confronto
                </label>
                <input
                  id="before-after-range"
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(clampSliderPosition(Number(e.target.value)))}
                  aria-label="Regola cursore confronto Prima e Dopo"
                  className="w-full accent-[#146C43] cursor-pointer"
                />
                <span className="font-mono text-xs font-semibold text-[#111A15] tabular-nums w-10 text-right">
                  {sliderPos}%
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  {label: 'Solo Prima', value: 92},
                  {label: '50 / 50', value: 50},
                  {label: 'Solo Dopo', value: 8},
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSliderPos(preset.value)}
                    className="px-2.5 py-1.5 text-xs font-medium text-[#3F4A43] hover:text-[#111A15] bg-white hover:bg-[#ECEFEA] border border-[#111A15]/12 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="bg-[#F6F7F5] border border-[#111A15]/10 rounded-xl p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -6}}
                  transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs text-[#546159]">
                    <span className="font-medium text-[#146C43]">{activeProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProject.location}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#111A15] leading-snug">
                    {activeProject.title}
                  </h3>

                  <p className="text-sm text-[#3F4A43] leading-relaxed">
                    {activeProject.description}
                  </p>

                  <div className="pt-3 border-t border-[#111A15]/10">
                    <span className="text-xs text-[#546159] block mb-0.5">
                      Risultato operativo
                    </span>
                    <span className="font-mono text-sm font-semibold text-[#111A15] tabular-nums">
                      {activeProject.metrics}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-[#546159] px-1">
                Seleziona cantiere ({projects.length})
              </h3>
              <div className="flex flex-col gap-2">
                {projects.map((project) => {
                  const isActive = project.id === activeProject.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(project.id);
                        setSliderPos(50);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C43] ${
                        isActive
                          ? 'bg-[#111A15] text-white border-[#111A15]'
                          : 'bg-white text-[#111A15] border-[#111A15]/12 hover:border-[#111A15]/30'
                      }`}
                    >
                      <div className="font-display text-sm font-semibold leading-snug">
                        {project.title}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isActive ? 'text-[#A7F3D0]' : 'text-[#546159]'
                        }`}
                      >
                        {project.location} · {project.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
