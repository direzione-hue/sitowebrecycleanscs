/**
 * Reads an image File selected by the user and returns a compressed JPEG data URL
 * so uploaded before/after or service photos persist reliably in localStorage.
 */
export function readImageFileAsDataUrl(file: File, maxDimension = 1400): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Seleziona un file immagine valido (JPG, PNG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      reject(new Error('Impossibile leggere il file selezionato.'));
    };

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Formato immagine non supportato.'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const targetWidth = Math.max(1, Math.round(img.width * scale));
        const targetHeight = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        try {
          const compressed = canvas.toDataURL('image/jpeg', 0.84);
          resolve(compressed);
        } catch {
          resolve(result);
        }
      };

      img.onerror = () => {
        reject(new Error('Il file selezionato non è un’immagine valida.'));
      };

      img.src = result;
    };

    reader.readAsDataURL(file);
  });
}
