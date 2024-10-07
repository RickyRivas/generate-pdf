import { json } from '@sveltejs/kit';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';


export async function POST({ request, fetch }) {
    const { fields, signature, date } = await request.json();

    // Create a PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];

    // Collect PDF data chunks
    doc.on('data', (chunk) => chunks.push(chunk));

    // Load and register the custom font
    // doc.registerFont('Footlight', 'static/footlight.TTF');
    const fontResponse = await fetch('/footlight.TTF');
    const fontBuffer = await fontResponse.arrayBuffer();
    doc.registerFont('Footlight', fontBuffer);

    // Helper function for adding text
    function addText(text, x, y, options = {}) {
        doc.text(text, x, y, { ...options, continued: false });
    }

    // Updated Title and Subtitle
    doc.fontSize(18).font('Footlight');
    addText('Oxford Park', 50, 50, { align: 'center' });
    doc.fontSize(14);
    addText('ARCHITECTURAL REVIEW COMMITTEE', 50, 75, { align: 'center' });
    doc.fontSize(16);
    addText('Property Modification Request for Approval', 50, 105, { align: 'center' });


    // Separator line
    doc.moveTo(50, 130).lineTo(550, 130).stroke();

    // Introductory Note
    let yPosition = 150;
    doc.fontSize(12);
    addText(`The purpose of this form is to facilitate the ACC's ability to review the requisition in accordance with the Covenants and make a recommendation to the Board regarding the Homeowner's request. Completion of this form and any required supporting documentation is required for ACC review. The ACC will endeavor to complete the review and recommendation process as quickly as possible but in no case in excess of thirty (30) days.`,
        50,
        yPosition, {
        width: 500,
        align: 'justify',
        lineGap: 2
    });

    // Form fields
    yPosition = doc.y + 20; // Add some space after the note
    doc.fontSize(12).font('Footlight');
    const lineHeight = doc.currentLineHeight() * 1.5;
    const pageWidth = 500; // Total available width
    const fieldSpacing = 15; // Spacing between fields

    fields.forEach(field => {
        // Add the label
        addText(`${ field.label }:`, 50, yPosition);

        if (field.type === 'textarea') {
            yPosition += lineHeight; // Move to the next line after the label

            // Draw 5 lines
            for (let i = 0; i < 5; i++) {
                doc.moveTo(50, yPosition + (i * lineHeight) + doc.currentLineHeight())
                    .lineTo(550, yPosition + (i * lineHeight) + doc.currentLineHeight())
                    .stroke();
            }

            // Add the text, wrapping over the lines
            doc.text(field.value, 50, yPosition, {
                width: pageWidth,
                align: 'left',
                lineGap: lineHeight - doc.currentLineHeight()
            });

            yPosition += 5 * lineHeight; // Move past the textarea field
        } else {
            // For regular fields, draw a single underline
            const labelWidth = doc.widthOfString(`${ field.label }:`) + 10;
            const valueWidth = pageWidth - labelWidth;

            doc.moveTo(50 + labelWidth, yPosition + doc.currentLineHeight())
                .lineTo(550, yPosition + doc.currentLineHeight())
                .stroke();

            // Add the value on top of the line
            addText(field.value, 50 + labelWidth, yPosition, {
                width: valueWidth,
                align: 'left'
            });

            yPosition += lineHeight; // Move to the next field
        }

        yPosition += fieldSpacing; // Add spacing between fields
    });

    // Start a new page for the understanding statement
    doc.addPage();

    yPosition = 50; // Reset yPosition for the new page
    doc.fontSize(12); // Smaller font for the long text

    // Note before signature
    addText(`I understand that the Architectural Control Committee has up to thirty (30) days to review my request for alteration and or modification to my property. I further understand that any work performed or cost(s) incurred by me prior to receiving written approval from the Board will be done so at my own risk as disapproval of my request may result in my requirement to restore my property to its original condition. I hereby indemnify the Oxford Park Homeowner's Association, its members, Board of Directors, employees and their heirs and successors from any and all costs past, present or future associated with this request and/or the modifications indicated therein. I certify by my signature that I have read and familiarized myself with the Magnolia Gardens Declaration of Covenants, Conditions and Restrictions and will insure that any and all modifications to my property will not violate those Covenants without express written waiver from the Board.`,
        50, yPosition, {
        width: pageWidth,
        align: 'justify',
        lineGap: 2
    });

    // Adjust yPosition based on the height of the understanding text
    yPosition = doc.y + lineHeight;

    // Signature and Date section
    yPosition += fieldSpacing;

    // Signature
    if (signature) {
        const base64Data = signature.replace(/^data:image\/\w+;base64,/, '');
        const signatureBuffer = Buffer.from(base64Data, 'base64');
        doc.image(signatureBuffer, 50, yPosition, { width: 150, height: 75 });
        yPosition += 75; // Move past the signature image
    } else {
        // If no signature, draw a line
        doc.moveTo(50, yPosition + doc.currentLineHeight())
            .lineTo(550, yPosition + doc.currentLineHeight())
            .stroke();
        yPosition += lineHeight;
    }
    addText('Signature of Homeowner', 50, yPosition);

    // Increased spacing between signature and date
    yPosition += lineHeight + fieldSpacing * 2; // Double the usual field spacing


    // Date
    const dateLabel = 'Date:';
    const dateLabelWidth = doc.widthOfString(dateLabel) + 10;
    const dateValueWidth = doc.widthOfString(date) + 20; // Add some padding

    addText(dateLabel, 50, yPosition);
    addText(date, 50 + dateLabelWidth, yPosition);

    // Draw underline only for the date value
    doc.moveTo(50 + dateLabelWidth, yPosition + doc.currentLineHeight())
        .lineTo(50 + dateLabelWidth + dateValueWidth, yPosition + doc.currentLineHeight())
        .stroke();

    // Add the new text after the date
    yPosition += lineHeight + fieldSpacing;
    addText(`Your application must be accompanied by a sketch of your property and the location of the proposed modifications as well as a sketch and/or picture of the modifications themselves. If the modifications include additions or modifications to the home itself than architectural drawings must be submitted. Paint samples, brick samples or other samples of building materials may be required by the ACC prior to approval.`,
        50, yPosition, {
        width: pageWidth,
        align: 'justify',
        lineGap: 2
    });

    // Add the image
    yPosition = doc.y + fieldSpacing;
    // doc.image('static/arcform.jpg', 50, yPosition, { width: 500, height: 372 });
    const imageResponse = await fetch('/arcform.jpg');
    const imageBuffer = await imageResponse.arrayBuffer();
    doc.image(imageBuffer, 50, yPosition, { width: 500, height: 372 });

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

    // artificial delay
    function artificialDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await artificialDelay(2000)

    return new Response(stream, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=Oxford_Park_ARC_Request.pdf'
        }
    });

}