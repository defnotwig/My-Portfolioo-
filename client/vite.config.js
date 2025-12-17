import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        react({
            // Optimize React Fast Refresh
            fastRefresh: true,
            // Use automatic JSX runtime
            jsxRuntime: 'automatic',
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3501,
    },
    build: {
        // Enable source maps for debugging (disable in production)
        sourcemap: false,
        // Minify for production
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.logs in production
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'ui-vendor': ['framer-motion', 'lucide-react'],
                    'radix-vendor': [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-avatar',
                        '@radix-ui/react-slot',
                    ],
                },
                // Optimize asset file names
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`;
                    } else if (/woff|woff2/.test(ext)) {
                        return `assets/fonts/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'framer-motion',
            'lucide-react',
            '@radix-ui/react-dialog',
            '@radix-ui/react-avatar',
        ],
        exclude: [],
    },
});

