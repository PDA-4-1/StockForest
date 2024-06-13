import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
