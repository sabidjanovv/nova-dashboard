import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1", // faqat IPv4 orqali ishlaydi
    port: 3000, // 5173 o‘rniga 3000 port
    strictPort: true, // agar port band bo‘lsa, xato chiqsin
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // bu juda muhim!
    },
  },
});
