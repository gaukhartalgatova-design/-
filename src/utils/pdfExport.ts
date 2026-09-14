import { originalTextbookData } from '../data/originalTextData';
import jsPDF from 'jspdf';

/**
 * Triggers the browser's native print-to-PDF dialog.
 * Works seamlessly with the @media print stylesheet in index.css.
 */
export const triggerPrintToPdf = (): void => {
  try {
    window.print();
  } catch (err) {
    console.error('Print failed:', err);
  }
};

/**
 * Directly builds and downloads a clean, formatted PDF document of the text
 * without requiring printer setup or print dialogs.
 */
export const downloadDirectPdf = async (
  paragraphId: 'all' | 'section3' | 'section4' = 'all'
): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const sections =
    paragraphId === 'all'
      ? originalTextbookData
      : originalTextbookData.filter((p) => p.id === paragraphId);

  // We create a temporary clean DOM element offscreen to render nicely styled Russian text with canvas/PDF
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4 pixel width at 96 DPI
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '40px';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  container.style.fontSize = '14px';
  container.style.lineHeight = '1.6';

  let htmlContent = `
    <div style="border-bottom: 3px solid #4338ca; padding-bottom: 16px; margin-bottom: 24px;">
      <div style="display: inline-block; background: #e0e7ff; color: #3730a3; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; margin-bottom: 8px;">
        Учебный материал по биологии • Без изменений
      </div>
      <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 0 0 6px 0;">
        Углеводы: Свойства, функции и химический анализ (§ 3 и § 4)
      </h1>
      <p style="font-size: 12px; color: #64748b; margin: 0;">
        Полный конспект без сокращений и изменений: формулы, классификации, реакция Бенедикта.
      </p>
    </div>
  `;

  sections.forEach((sec) => {
    htmlContent += `
      <div style="margin-bottom: 32px;">
        <div style="background: #f8fafc; border-left: 4px solid #4f46e5; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 8px 8px 0;">
          <h2 style="font-size: 18px; font-weight: 800; color: #1e1b4b; margin: 0;">
            ${sec.number}. ${sec.title}
          </h2>
        </div>
        <div style="white-space: pre-wrap; font-size: 13px; line-height: 1.65; color: #1e293b; background: #ffffff;">
${sec.plainText}
        </div>
      </div>
    `;
  });

  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  try {
    await doc.html(container, {
      callback: (pdf) => {
        pdf.save('Biologiya_Uglevody_Paragrafy_3_4_Bez_Izmeneniy.pdf');
        document.body.removeChild(container);
      },
      x: 10,
      y: 10,
      width: 190, // target width in mm
      windowWidth: 794,
    });
  } catch (err) {
    console.error('jsPDF generation error:', err);
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    // Fallback: trigger print dialog
    triggerPrintToPdf();
  }
};

/**
 * Downloads a text or doc file with the complete, unaltered text of § 3 and § 4.
 */
export const downloadTextFile = (format: 'txt' | 'doc' = 'txt'): void => {
  const fullContent = originalTextbookData
    .map((p) => p.plainText)
    .join('\n\n' + '='.repeat(60) + '\n\n');

  const mimeType = format === 'doc' ? 'application/msword;charset=utf-8' : 'text/plain;charset=utf-8';
  const fileName = `biologiya_uglevody_paragrafy_3_4_bez_izmeneniy.${format}`;

  const blob = new Blob([fullContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Opens a clean, dedicated printable window containing the unaltered textbook text
 * and automatically triggers print/save as PDF.
 */
export const openAndPrintOriginalText = (): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // If popups are blocked in iframe, fallback to downloading file
    downloadTextFile('txt');
    return;
  }

  const sectionsHtml = originalTextbookData
    .map(
      (p) => `
      <section style="margin-bottom: 40px; page-break-inside: avoid;">
        <h1 style="font-size: 22px; font-weight: 900; color: #1e1b4b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">
          ${p.number}. ${p.title}
        </h1>
        <div style="font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
${p.plainText}
        </div>
      </section>
    `
    )
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="utf-8">
        <title>Биология: Углеводы (§ 3 и § 4) — Оригинальный текст без изменений</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 1.5cm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: #fff;
            color: #0f172a;
            margin: 0;
            padding: 20px;
          }
          .header-badge {
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            font-weight: 800;
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 24px; padding: 16px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <strong>Документ готов к сохранению в PDF.</strong>
            <div style="font-size: 12px; color: #64748b;">Выберите пункт «Сохранить как PDF» в диалоге печати.</div>
          </div>
          <button onclick="window.print()" style="background: #4f46e5; color: white; border: none; padding: 10px 20px; font-size: 14px; font-weight: bold; border-radius: 8px; cursor: pointer;">
            Печать / Сохранить в PDF
          </button>
        </div>
        <div>
          <div class="header-badge">Учебный материал без изменений</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 24px;">Полный текст параграфов § 3 и § 4 по биологии клетки</div>
        </div>
        ${sectionsHtml}
        <script>
          setTimeout(() => {
            window.print();
          }, 400);
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
