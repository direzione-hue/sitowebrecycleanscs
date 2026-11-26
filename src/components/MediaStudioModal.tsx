import {useState} from 'react';
import {Download, Plus, RotateCcw, Trash2, Upload, X} from 'lucide-react';
import {motion} from 'motion/react';
import type {BeforeAfterProject, ServiceCategory, ServiceItem} from '../types/recyclena';
import {readImageFileAsDataUrl} from '../utils/imageProcessor';
import {validateBeforeAfterInput} from '../utils/portfolioLogic';
import {ResilientImage} from './ResilientImage';

interface MediaStudioModalProps {
  initialTab: 'beforeAfter' | 'services';
  services: ServiceItem[];
  beforeAfterProjects: BeforeAfterProject[];
  customServiceImages: Record<string, string>;
  onClose: () => void;
  onUpdateServicePhoto: (serviceId: string, imageUrl: string) => void;
  onSaveBeforeAfterProject: (project: BeforeAfterProject) => void;
  onDeleteBeforeAfterProject: (projectId: string) => void;
  onResetAll: () => void;
}

const EDITABLE_CATEGORIES: Exclude<ServiceCategory, 'Tutti'>[] = [
  'Pulizie & Sanificazione',
  'Verde & Forestale',
  'Ambiente & Sgomberi',
  'Facility & Logistica',
  'Servizi alla Persona & Guardiania',
];

export function MediaStudioModal({
  initialTab,
  services,
  beforeAfterProjects,
  customServiceImages,
  onClose,
  onUpdateServicePhoto,
  onSaveBeforeAfterProject,
  onDeleteBeforeAfterProject,
  onResetAll,
}: MediaStudioModalProps) {
  const [activeTab, setActiveTab] = useState<'beforeAfter' | 'services'>(initialTab);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<Exclude<ServiceCategory, 'Tutti'>>(
    'Pulizie & Sanificazione',
  );
  const [description, setDescription] = useState('');
  const [metrics, setMetrics] = useState('');
  const [beforeImageUrl, setBeforeImageUrl] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [serviceUrlInputs, setServiceUrlInputs] = useState<Record<string, string>>({});

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setLocation('');
    setCategory('Pulizie & Sanificazione');
    setDescription('');
    setMetrics('');
    setBeforeImageUrl('');
    setAfterImageUrl('');
    setFormErrors({});
  };

  const loadProjectForEdit = (project: BeforeAfterProject) => {
    setEditingId(project.id);
    setTitle(project.title);
    setLocation(project.location);
    setCategory(project.category);
    setDescription(project.description);
    setMetrics(project.metrics);
    setBeforeImageUrl(project.beforeImageUrl);
    setAfterImageUrl(project.afterImageUrl);
    setFormErrors({});
    setStatusMessage(null);
  };

  const handleBeforeAfterFileUpload = async (
    file: File | undefined,
    target: 'before' | 'after',
  ) => {
    if (!file) return;
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      if (target === 'before') {
        setBeforeImageUrl(dataUrl);
        setFormErrors((prev) => ({...prev, beforeImageUrl: ''}));
      } else {
        setAfterImageUrl(dataUrl);
        setFormErrors((prev) => ({...prev, afterImageUrl: ''}));
      }
      setStatusMessage(
        target === 'before'
          ? 'Foto "Prima" caricata correttamente.'
          : 'Foto "Dopo" caricata correttamente.',
      );
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Errore nel caricamento dell’immagine.',
      );
    }
  };

  const handleServiceFileUpload = async (serviceId: string, file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      onUpdateServicePhoto(serviceId, dataUrl);
      setStatusMessage('Foto servizio aggiornata e salvata nel browser.');
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Errore nel caricamento dell’immagine.',
      );
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateBeforeAfterInput({
      title,
      location,
      beforeImageUrl,
      afterImageUrl,
    });
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const project: BeforeAfterProject = {
      id: editingId ?? `custom-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      category,
      description:
        description.trim() ||
        'Intervento eseguito da squadre specializzate Recyclean secondo standard ISO 9001.',
      metrics: metrics.trim() || 'Completato con verifica qualità',
      beforeImageUrl: beforeImageUrl.trim(),
      afterImageUrl: afterImageUrl.trim(),
      beforeLabel: 'Prima',
      afterLabel: 'Dopo · Recyclean',
      isCustom: true,
    };

    onSaveBeforeAfterProject(project);
    setStatusMessage(
      editingId
        ? 'Lavoro Prima & Dopo aggiornato con successo.'
        : 'Nuovo lavoro Prima & Dopo aggiunto alla galleria.',
    );
    resetForm();
  };

  const handleExportJson = () => {
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        serviceImages: customServiceImages,
        beforeAfterProjects,
      },
      null,
      2,
    );
    const blob = new Blob([payload], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'recyclean-galleria-foto.json';
    anchor.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Backup galleria esportato in formato JSON.');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-studio-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{opacity: 0, scale: 0.97, y: 12}}
        animate={{opacity: 1, scale: 1, y: 0}}
        transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F6F7F5] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-[#111A15]/15 overflow-hidden"
      >
        <div className="px-6 py-4 bg-white border-b border-[#111A15]/10 flex items-center justify-between gap-4">
          <div>
            <h2 id="media-studio-title" className="font-display text-xl font-bold text-[#111A15]">
              Gestione Foto Servizi & Lavori Prima/Dopo
            </h2>
            <p className="text-xs text-[#546159]">
              Carica immagini dal tuo dispositivo o incolla un link: le modifiche vengono salvate
              automaticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi pannello gestione foto"
            className="w-10 h-10 rounded-lg border border-[#111A15]/12 text-[#111A15] hover:bg-[#F6F7F5] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-white border-b border-[#111A15]/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('beforeAfter')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                activeTab === 'beforeAfter'
                  ? 'bg-[#111A15] text-white'
                  : 'bg-[#F6F7F5] text-[#3F4A43] hover:text-[#111A15]'
              }`}
            >
              Lavori Prima & Dopo ({beforeAfterProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#111A15] text-white'
                  : 'bg-[#F6F7F5] text-[#3F4A43] hover:text-[#111A15]'
              }`}
            >
              Foto Servizi ({services.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#111A15] bg-white border border-[#111A15]/15 rounded-lg hover:bg-[#F6F7F5] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Esporta Backup</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onResetAll();
                resetForm();
                setStatusMessage('Galleria ripristinata alle foto originali.');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#991B1B] bg-white border border-[#991B1B]/25 rounded-lg hover:bg-[#FEF2F2] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ripristina Predefiniti</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            role="status"
            className="mx-6 mt-4 px-4 py-2.5 rounded-lg bg-[#ECFDF5] border border-[#146C43]/30 text-sm text-[#0F5232] font-medium"
          >
            {statusMessage}
          </div>
        )}

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'beforeAfter' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form
                onSubmit={handleSaveProject}
                className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#111A15]/10 space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-[#111A15]">
                    {editingId ? 'Modifica Lavoro Prima & Dopo' : 'Aggiungi Nuovo Prima & Dopo'}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs font-medium text-[#146C43] hover:underline cursor-pointer"
                    >
                      Annulla modifica
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="ba-title"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1"
                    >
                      Titolo intervento *
                    </label>
                    <input
                      id="ba-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Es. Pulizia e sgombero capannone"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {formErrors.title && (
                      <p className="text-xs text-[#991B1B] mt-1">{formErrors.title}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="ba-location"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1"
                    >
                      Comune / Località *
                    </label>
                    <input
                      id="ba-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Es. Sassari · Zona Industriale"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                    {formErrors.location && (
                      <p className="text-xs text-[#991B1B] mt-1">{formErrors.location}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="ba-category"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1"
                    >
                      Categoria
                    </label>
                    <select
                      id="ba-category"
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value as Exclude<ServiceCategory, 'Tutti'>)
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#111A15]/15 bg-white focus:outline-2 focus:outline-[#146C43]"
                    >
                      {EDITABLE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ba-metrics"
                      className="block text-xs font-semibold text-[#3F4A43] mb-1"
                    >
                      Risultato (metri / ore)
                    </label>
                    <input
                      id="ba-metrics"
                      type="text"
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      placeholder="Es. 950 mq completati in 24h"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ba-desc"
                    className="block text-xs font-semibold text-[#3F4A43] mb-1"
                  >
                    Descrizione sintetica
                  </label>
                  <textarea
                    id="ba-desc"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrivi le attività eseguite (sgrossatura, sfalcio, sanificazione...)"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#111A15]/15 focus:outline-2 focus:outline-[#146C43]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-2 p-3 rounded-lg bg-[#F6F7F5] border border-[#111A15]/10">
                    <span className="text-xs font-semibold text-[#111A15] block">
                      Foto PRIMA *
                    </span>
                    <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#111A15] hover:bg-[#23322A] rounded-lg cursor-pointer">
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Carica dal dispositivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleBeforeAfterFileUpload(e.target.files?.[0], 'before')}
                      />
                    </label>
                    <input
                      type="url"
                      aria-label="URL foto Prima"
                      value={beforeImageUrl.startsWith('data:') ? '' : beforeImageUrl}
                      onChange={(e) => setBeforeImageUrl(e.target.value)}
                      placeholder="Oppure incolla URL immagine..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white rounded border border-[#111A15]/15"
                    />
                    {beforeImageUrl && (
                      <div className="aspect-[16/9] rounded overflow-hidden border border-[#111A15]/10">
                        <ResilientImage src={beforeImageUrl} alt="Anteprima foto Prima" />
                      </div>
                    )}
                    {formErrors.beforeImageUrl && (
                      <p className="text-xs text-[#991B1B]">{formErrors.beforeImageUrl}</p>
                    )}
                  </div>

                  <div className="space-y-2 p-3 rounded-lg bg-[#F6F7F5] border border-[#111A15]/10">
                    <span className="text-xs font-semibold text-[#111A15] block">
                      Foto DOPO *
                    </span>
                    <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg cursor-pointer">
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Carica dal dispositivo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleBeforeAfterFileUpload(e.target.files?.[0], 'after')}
                      />
                    </label>
                    <input
                      type="url"
                      aria-label="URL foto Dopo"
                      value={afterImageUrl.startsWith('data:') ? '' : afterImageUrl}
                      onChange={(e) => setAfterImageUrl(e.target.value)}
                      placeholder="Oppure incolla URL immagine..."
                      className="w-full px-2.5 py-1.5 text-xs bg-white rounded border border-[#111A15]/15"
                    />
                    {afterImageUrl && (
                      <div className="aspect-[16/9] rounded overflow-hidden border border-[#111A15]/10">
                        <ResilientImage src={afterImageUrl} alt="Anteprima foto Dopo" />
                      </div>
                    )}
                    {formErrors.afterImageUrl && (
                      <p className="text-xs text-[#991B1B]">{formErrors.afterImageUrl}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>{editingId ? 'Salva Modifiche' : 'Aggiungi alla Galleria Prima & Dopo'}</span>
                </button>
              </form>

              <div className="lg:col-span-5 space-y-3">
                <h3 className="font-display text-sm font-bold text-[#111A15]">
                  Cantieri presenti in galleria
                </h3>
                <div className="space-y-3">
                  {beforeAfterProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white p-3.5 rounded-xl border border-[#111A15]/10 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display text-sm font-semibold text-[#111A15]">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-[#546159]">{proj.location}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => loadProjectForEdit(proj)}
                            className="px-2.5 py-1 text-xs font-medium text-[#111A15] bg-[#F6F7F5] hover:bg-[#E4E7E2] rounded cursor-pointer"
                          >
                            Modifica
                          </button>
                          <button
                            type="button"
                            aria-label={`Elimina ${proj.title}`}
                            onClick={() => {
                              onDeleteBeforeAfterProject(proj.id);
                              if (editingId === proj.id) {
                                resetForm();
                              }
                            }}
                            className="p-1.5 text-[#991B1B] hover:bg-[#FEF2F2] rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="aspect-[16/9] rounded overflow-hidden bg-[#17251E]">
                          <ResilientImage src={proj.beforeImageUrl} alt={`Prima: ${proj.title}`} />
                        </div>
                        <div className="aspect-[16/9] rounded overflow-hidden bg-[#17251E]">
                          <ResilientImage src={proj.afterImageUrl} alt={`Dopo: ${proj.title}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => {
                const hasCustom = Boolean(customServiceImages[service.id]);
                const pendingUrl = serviceUrlInputs[service.id] ?? '';
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-xl border border-[#111A15]/10 overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[16/9] bg-[#17251E]">
                      <ResilientImage src={service.imageUrl} alt={service.imageAlt} />
                    </div>
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-[#546159]">
                          {service.index} · {service.category}
                        </div>
                        <h3 className="font-display text-base font-bold text-[#111A15]">
                          {service.title}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#146C43] hover:bg-[#0F5232] rounded-lg cursor-pointer">
                            <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Carica nuova foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) =>
                                handleServiceFileUpload(service.id, e.target.files?.[0])
                              }
                            />
                          </label>

                          {hasCustom && (
                            <button
                              type="button"
                              onClick={() => onUpdateServicePhoto(service.id, '')}
                              className="px-2.5 py-1.5 text-xs font-medium text-[#991B1B] bg-[#FEF2F2] rounded-lg cursor-pointer"
                            >
                              Ripristina foto originale
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            aria-label={`URL foto per ${service.title}`}
                            value={pendingUrl}
                            onChange={(e) =>
                              setServiceUrlInputs((prev) => ({
                                ...prev,
                                [service.id]: e.target.value,
                              }))
                            }
                            placeholder="Oppure incolla URL immagine..."
                            className="flex-1 px-2.5 py-1.5 text-xs rounded border border-[#111A15]/15"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (pendingUrl.trim()) {
                                onUpdateServicePhoto(service.id, pendingUrl);
                                setServiceUrlInputs((prev) => ({...prev, [service.id]: ''}));
                                setStatusMessage(`Foto aggiornata per "${service.title}".`);
                              }
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-[#111A15] bg-[#F6F7F5] hover:bg-[#E4E7E2] border border-[#111A15]/15 rounded cursor-pointer"
                          >
                            Applica
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
