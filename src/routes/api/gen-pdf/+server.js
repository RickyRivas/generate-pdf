import { json } from '@sveltejs/kit';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

export async function POST({ request }) {
    const { fields, signature, date } = await request.json();

    // Create a PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];

    // Collect PDF data chunks
    doc.on('data', (chunk) => chunks.push(chunk));

    // Helper function for adding text
    function addText(text, x, y, options = {}) {
        doc.text(text, x, y, { ...options, continued: false });
    }

    // Title and Subtitle
    doc.fontSize(18).font('Helvetica-Bold');
    addText('Oxford Park - ARC', 50, 50, { align: 'center' });
    doc.fontSize(14);
    addText('Property Modification Request', 50, 75, { align: 'center' });

    // Separator line
    doc.moveTo(50, 100).lineTo(550, 100).stroke();

    // Form fields
    doc.fontSize(12).font('Helvetica');
    let yPosition = 120;

    fields.forEach(field => {
        addText(`${ field.label }:`, 50, yPosition);
        doc.font('Helvetica-Bold');
        addText(field.value, 50, yPosition + 15);
        doc.font('Helvetica');
        yPosition += 40;
    });

    // Note before signature
    yPosition += 20;
    addText('I understand that the ARC committee has up to thirty days to review my request.', 50, yPosition, { width: 500 });

    // Signature
    yPosition += 40;
    addText('Signature:', 50, yPosition);
    if (signature) {
        const base64Data = signature.replace(/^data:image\/\w+;base64,/, '');
        const signatureBuffer = Buffer.from(base64Data, 'base64');
        doc.image(signatureBuffer, 120, yPosition - 30, { width: 150 });
    }

    // Date
    addText('Date:', 350, yPosition);
    doc.font('Helvetica-Bold');
    addText(date, 390, yPosition);

    // Finalize the PDF
    doc.end();

    // Wait for the PDF to be fully generated
    await new Promise(resolve => doc.on('end', resolve));

    // Concatenate all chunks into a single buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null);

    return new Response(stream, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=Oxford_Park_ARC_Request.pdf'
        }
    });

}