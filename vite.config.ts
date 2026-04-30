import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
    server: {
        open: true,
        port: 3000,
    },
    plugins: [
        handlebarsPlugin({
            templateFileExtension: 'hbs',
            partialsDirectoryPath: path.resolve(__dirname, 'src/blocks'),
            compileOptions: {},
            transformIndexHtmlOptions: {
                context: () => ({ title: 'Мой проект' }),
                helpers: {
                    uppercase: (str: string) => str.toUpperCase(),
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});