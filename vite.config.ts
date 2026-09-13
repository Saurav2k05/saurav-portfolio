import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure generated project preview images are copied into public/images
const imagesToCopy = [
  {
    src: "C:\\Users\\asus\\.gemini\\antigravity-ide\\brain\\cd07422d-aeac-4efc-bc83-617278eb119c\\agriconnect_preview_1789232380461.jpg",
    dest: "public/images/agriconnect.jpg",
  },
  {
    src: "C:\\Users\\asus\\.gemini\\antigravity-ide\\brain\\cd07422d-aeac-4efc-bc83-617278eb119c\\sanction_dashboard_preview_1789232402031.jpg",
    dest: "public/images/sanction_dashboard.jpg",
  },
  {
    src: "C:\\Users\\asus\\.gemini\\antigravity-ide\\brain\\cd07422d-aeac-4efc-bc83-617278eb119c\\enterprise_portal_preview_1789232541356.jpg",
    dest: "public/images/enterprise_portal.jpg",
  },
  {
    src: "C:\\Users\\asus\\.gemini\\antigravity-ide\\brain\\cd07422d-aeac-4efc-bc83-617278eb119c\\hackathon_app_preview_1789232565488.jpg",
    dest: "public/images/hackathon_app.jpg",
  },
];

for (const img of imagesToCopy) {
  try {
    const destPath = path.resolve(__dirname, img.dest);
    if (fs.existsSync(img.src)) {
      fs.copyFileSync(img.src, destPath);
    }
  } catch (err) {
    console.error("Image copy error:", err);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
