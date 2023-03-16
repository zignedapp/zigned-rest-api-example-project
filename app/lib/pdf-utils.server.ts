import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import * as fs from "fs";
import * as path from "path";

// Path to the temporary files folder
const tempFilePath = path.join(__dirname, "../app/temporary_files");

// This is the PDF template that will be used to generate the PDF
const pdfTemplate = fs.readFileSync(
  path.join(__dirname, "../app/assets/guess_app_pdf_template.pdf")
);

// Load the font that will be used in the PDF
const fontPath = path.join(
  __dirname,
  "../app/assets/fonts/Inter-SemiBold.woff"
);
const interSemiBold = fs.readFileSync(fontPath);

// pdf-lib need the font as an ArrayBuffer
const interSemiBoldAsArrayBuffer = new Uint8Array(interSemiBold).buffer;

// This is Zigneds Primary Color
const primaryColor = rgb(0.23, 0.23, 0.95);

/**
 *
 * Takes a guess (number) and an id pointing to the saved guess in the database.
 * We use this ID to save a temporary PDF which we can retrieve by the same ID when uploading the file to the Zigned REST API.
 *
 */

export async function generatePDF({
  guess,
  id,
}: {
  guess: number;
  id: string;
}) {
  try {
    // Load the PDF template
    const pdfTemplateDoc = await PDFDocument.load(pdfTemplate);

    // Register
    pdfTemplateDoc.registerFontkit(fontkit);

    // Embed the font
    const font = await pdfTemplateDoc.embedFont(interSemiBoldAsArrayBuffer, {
      subset: true,
      customName: "Inter-Semibold",
    });

    // Get the first page of the PDF
    const page = pdfTemplateDoc.getPages()[0];

    // Set the font size
    const textSize = 96;

    // Convert the guess (number) to a string
    const text = `${guess}`;

    // Get the width and height of the text at the specified size
    const textWidth = font.widthOfTextAtSize(text, textSize);
    const textHeight = font.heightAtSize(textSize);

    // Get the width and height of the page
    const { height, width } = page.getSize();

    // Draw the text at the center of the page, using the primary color

    page.drawText(`${guess}`, {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2 + 100,
      size: textSize,
      font: font,
      color: primaryColor,
    });

    // Get the final PDF as an array buffer (Uint8Array)
    const pdfBytes = await pdfTemplateDoc.save();

    // Write the PDF to the temporary files folder
    fs.writeFileSync(`${tempFilePath}/${id}.pdf`, pdfBytes);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeTemporaryPdf(id: string) {
  // Delete the temporary file
  fs.unlinkSync(`${tempFilePath}/${id}.pdf`);
  return;
}
