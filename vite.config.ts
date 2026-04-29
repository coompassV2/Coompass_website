
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Allow connections from all network interfaces
    port: 8081,
    strictPort: true, // Keep standalone app on its own fixed port
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        timeout: 60000, // 60s for file uploads (mission image up to 5MB)
        configure: (proxy) => {
          proxy.on("error", (err, _req, _res) => {
            console.error("[Vite proxy] API error:", err.message);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            if (req.method === "POST" && req.url?.includes("/api/uploads/")) {
              proxyReq.setTimeout(60000);
            }
          });
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
