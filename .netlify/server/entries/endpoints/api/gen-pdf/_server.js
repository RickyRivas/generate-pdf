import "../../../../chunks/index.js";
import PDFDocument from "pdfkit";
import { Readable } from "stream";
async function POST({ request }) {
  const { fields, signature, date } = await request.json();
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.registerFont("Footlight", "static/footlight.TTF");
  function addText(text, x, y, options = {}) {
    doc.text(text, x, y, { ...options, continued: false });
  }
  doc.fontSize(18).font("Footlight");
  addText("Oxford Park", 50, 50, { align: "center" });
  doc.fontSize(14);
  addText("ARCHITECTURAL REVIEW COMMITTEE", 50, 75, { align: "center" });
  doc.fontSize(16);
  addText("Property Modification Request for Approval", 50, 105, { align: "center" });
  doc.moveTo(50, 130).lineTo(550, 130).stroke();
  let yPosition = 150;
  doc.fontSize(12);
  addText(
    `The purpose of this form is to facilitate the ACC's ability to review the requisition in accordance with the Covenants and make a recommendation to the Board regarding the Homeowner's request. Completion of this form and any required supporting documentation is required for ACC review. The ACC will endeavor to complete the review and recommendation process as quickly as possible but in no case in excess of thirty (30) days.`,
    50,
    yPosition,
    {
      width: 500,
      align: "justify",
      lineGap: 2
    }
  );
  yPosition = doc.y + 20;
  doc.fontSize(12).font("Footlight");
  const lineHeight = doc.currentLineHeight() * 1.5;
  const pageWidth = 500;
  const fieldSpacing = 15;
  fields.forEach((field) => {
    addText(`${field.label}:`, 50, yPosition);
    if (field.type === "textarea") {
      yPosition += lineHeight;
      for (let i = 0; i < 5; i++) {
        doc.moveTo(50, yPosition + i * lineHeight + doc.currentLineHeight()).lineTo(550, yPosition + i * lineHeight + doc.currentLineHeight()).stroke();
      }
      doc.text(field.value, 50, yPosition, {
        width: pageWidth,
        align: "left",
        lineGap: lineHeight - doc.currentLineHeight()
      });
      yPosition += 5 * lineHeight;
    } else {
      const labelWidth = doc.widthOfString(`${field.label}:`) + 10;
      const valueWidth = pageWidth - labelWidth;
      doc.moveTo(50 + labelWidth, yPosition + doc.currentLineHeight()).lineTo(550, yPosition + doc.currentLineHeight()).stroke();
      addText(field.value, 50 + labelWidth, yPosition, {
        width: valueWidth,
        align: "left"
      });
      yPosition += lineHeight;
    }
    yPosition += fieldSpacing;
  });
  doc.addPage();
  yPosition = 50;
  doc.fontSize(12);
  addText(
    `I understand that the Architectural Control Committee has up to thirty (30) days to review my request for alteration and or modification to my property. I further understand that any work performed or cost(s) incurred by me prior to receiving written approval from the Board will be done so at my own risk as disapproval of my request may result in my requirement to restore my property to its original condition. I hereby indemnify the Magnolia Gardens Homeowner's Association, its members, Board of Directors, employees and their heirs and successors from any and all costs past, present or future associated with this request and/or the modifications indicated therein. I certify by my signature that I have read and familiarized myself with the Magnolia Gardens Declaration of Covenants, Conditions and Restrictions and will insure that any and all modifications to my property will not violate those Covenants without express written waiver from the Board.`,
    50,
    yPosition,
    {
      width: pageWidth,
      align: "justify",
      lineGap: 2
    }
  );
  yPosition = doc.y + lineHeight;
  yPosition += fieldSpacing;
  if (signature) {
    const base64Data = signature.replace(/^data:image\/\w+;base64,/, "");
    const signatureBuffer = Buffer.from(base64Data, "base64");
    doc.image(signatureBuffer, 50, yPosition, { width: 150, height: 75 });
    yPosition += 75;
  } else {
    doc.moveTo(50, yPosition + doc.currentLineHeight()).lineTo(550, yPosition + doc.currentLineHeight()).stroke();
    yPosition += lineHeight;
  }
  addText("Signature of Homeowner", 50, yPosition);
  yPosition += lineHeight + fieldSpacing * 2;
  const dateLabel = "Date:";
  const dateLabelWidth = doc.widthOfString(dateLabel) + 10;
  const dateValueWidth = doc.widthOfString(date) + 20;
  addText(dateLabel, 50, yPosition);
  addText(date, 50 + dateLabelWidth, yPosition);
  doc.moveTo(50 + dateLabelWidth, yPosition + doc.currentLineHeight()).lineTo(50 + dateLabelWidth + dateValueWidth, yPosition + doc.currentLineHeight()).stroke();
  yPosition += lineHeight + fieldSpacing;
  addText(
    `Your application must be accompanied by a sketch of your property and the location of the proposed modifications as well as a sketch and/or picture of the modifications themselves. If the modifications include additions or modifications to the home itself than architectural drawings must be submitted. Paint samples, brick samples or other samples of building materials may be required by the ACC prior to approval.`,
    50,
    yPosition,
    {
      width: pageWidth,
      align: "justify",
      lineGap: 2
    }
  );
  yPosition = doc.y + fieldSpacing;
  doc.image("static/arcform.jpg", 50, yPosition, { width: 500, height: 372 });
  doc.end();
  await new Promise((resolve) => doc.on("end", resolve));
  const pdfBuffer = Buffer.concat(chunks);
  const stream = new Readable();
  stream.push(pdfBuffer);
  stream.push(null);
  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Oxford_Park_ARC_Request.pdf"
    }
  });
}
export {
  POST
};
