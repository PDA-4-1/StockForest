import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
            protocol: 'ws',
            host: 'stockforest.kro.kr',
            clientPort: 80,
        },
    },
    resolve: {
        alias: [
            // 절대경로로 접근하기
            { find: "~/components", replacement: "/src/components" },
            { find: "~/lib", replacement: "/src/lib" },
            { find: "~/routers", replacement: "/src/routers" },
            { find: "~/routes", replacement: "/src/routes" },
            { find: "~/store", replacement: "/src/store" },
            { find: "~/public", replacement: "/public" },
        ],
    },
});
