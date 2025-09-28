import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";

GlobalWorkerOptions.workerSrc = workerSrc;

export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((i) => i.str).join(" ") + "\n";
  }

  return text;
}

export async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export function parseContactInfo(text) {
  const res = { name: null, email: null, phone: null };

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) res.email = emailMatch[0];

  const phoneMatch = text.match(/(\+?\d[\d\s\-()]{7,}\d)/);
  if (phoneMatch) res.phone = phoneMatch[0].replace(/\s+/g, "");

  const lines = text
    .split("\n")
    .slice(0, 8)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length) {
    const candidateLine = lines.find((l) =>
      /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(l)
    );
    if (candidateLine) res.name = candidateLine.split(/\s{2,}|,/)[0];
  }

  return res;
}
