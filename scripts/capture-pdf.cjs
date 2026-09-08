#!/usr/bin/env node
/**
 * Captures all 21 Shona prototype screens as a PDF.
 * Usage: node scripts/capture-pdf.js
 */

const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve(__dirname, "../dist-pdf");
const OUT_PDF = path.resolve(OUT_DIR, "Shona-Prototype-23-Pages.pdf");
const WIDTH = 1440;
const HEIGHT = 900;

const SCREENS = [
  { idx: 0, label: "01 — Landing: Arrival" },
  { idx: 1, label: "02 — Landing: Navigation" },
  { idx: 2, label: "03 — How Shona Works" },
  { idx: 3, label: "04 — For Brands" },
  { idx: 4, label: "05 — Brand Portal: Overview" },
  { idx: 5, label: "06 — Brand Portal: Tracking Insights" },
  { idx: 6, label: "07 — Brand Portal: Inventory Recovery" },
  { idx: 7, label: "08 — Brand Portal: Operational Intelligence" },
  { idx: 8, label: "09 — Customer: Aftercare Overview" },
  { idx: 9, label: "10 — Customer Booking: Garment Intake" },
  { idx: 10, label: "11 — Customer Booking: Assessment + Pricing" },
  { idx: 11, label: "12 — Customer Booking: Address" },
  { idx: 12, label: "13 — Customer Booking: Calendar" },
  { idx: 13, label: "14 — Customer Booking: Confirmation" },
  { idx: 14, label: "15 — Customer Tracking" },
  { idx: 15, label: "16 — WhatsApp: Tracking + Specialist Chat" },
  { idx: 16, label: "17 — Pricing Architecture" },
  { idx: 17, label: "18 — Resources" },
  { idx: 18, label: "19 — Partner with Shona" },
  { idx: 19, label: "20 — System Map" },
  { idx: 20, label: "21 — Design Decisions" },
  { idx: 21, label: "22 — Brand Onboarding" },
  { idx: 22, label: "23 — New Assessment Intake" },
];

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Launching Chromium…");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--font-render-hinting=none",
    ],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1.5 });

  // Load the app first and wait for fonts
  console.log("Loading app…");
  await page.goto(BASE_URL + "/#0", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const screenshots = [];

  for (const screen of SCREENS) {
    console.log(`Capturing ${screen.label}…`);

    // Navigate via hash
    await page.evaluate((idx) => {
      window.location.hash = String(idx);
    }, screen.idx);

    // Wait for React to re-render
    await new Promise(r => setTimeout(r, 600));

    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));

    // Get full page height
    const bodyHeight = await page.evaluate((h) =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, h),
      HEIGHT
    );

    const clampedHeight = Math.min(bodyHeight, 6000); // max 6000px

    // Take screenshot
    const imgPath = path.join(OUT_DIR, `screen-${String(screen.idx).padStart(2, "0")}.png`);
    await page.setViewport({ width: WIDTH, height: clampedHeight, deviceScaleFactor: 1.5 });
    await page.screenshot({ path: imgPath, fullPage: false });
    screenshots.push({ path: imgPath, label: screen.label, height: clampedHeight });

    // Reset viewport
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1.5 });
  }

  await browser.close();
  console.log("\nAll screenshots captured. Generating PDF…");

  // Build PDF using puppeteer's PDF API (one page per screenshot)
  const browser2 = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    headless: true,
  });

  const pdfPage = await browser2.newPage();

  // Build an HTML document with each screenshot as a separate print page
  const screenshotHtml = screenshots
    .map((s) => {
      const dataUrl = `data:image/png;base64,${fs.readFileSync(s.path).toString("base64")}`;
      return `<div class="page">
        <div class="label">${s.label}</div>
        <img src="${dataUrl}" style="width:100%;display:block;" />
      </div>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: white; font-family: sans-serif; }
  .page {
    page-break-after: always;
    break-after: page;
    position: relative;
  }
  .page:last-child {
    page-break-after: avoid;
    break-after: avoid;
  }
  .label {
    position: absolute;
    top: 0; left: 0;
    background: #1C1A17;
    color: #F47920;
    font-size: 9px;
    font-family: monospace;
    padding: 3px 8px;
    z-index: 10;
    letter-spacing: 0.05em;
  }
  img { max-width: 100%; }
</style>
</head>
<body>${screenshotHtml}</body>
</html>`;

  const htmlPath = path.join(OUT_DIR, "_print.html");
  fs.writeFileSync(htmlPath, html);

  await pdfPage.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1000));

  await pdfPage.pdf({
    path: OUT_PDF,
    width: `${WIDTH}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser2.close();

  // Clean up individual screenshots
  screenshots.forEach((s) => fs.unlinkSync(s.path));
  fs.unlinkSync(htmlPath);

  const stats = fs.statSync(OUT_PDF);
  console.log(`\n✓ PDF saved to: ${OUT_PDF}`);
  console.log(`  Size: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Pages: ${screenshots.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
