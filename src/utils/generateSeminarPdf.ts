import jsPDF from "jspdf";

const SEMINAR_IMAGE_URL =
  "https://cdn.poehali.dev/projects/d33cb4c1-0952-4afa-b115-887b4c7da346/files/6876d2a0-9219-4357-bf1d-b362d4a1aeac.jpg";

function loadImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context error"));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.95));
    };
    img.onerror = () => reject(new Error("Image load error"));
    img.src = url;
  });
}

export async function generateSeminarPdf(): Promise<string> {
  const imageData = await loadImageAsBase64(SEMINAR_IMAGE_URL);

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;

  doc.addImage(imageData, "JPEG", 0, 0, pageW, pageH);

  const pdfBase64 = doc.output("datauristring").split(",")[1];
  return pdfBase64;
}

export default generateSeminarPdf;
