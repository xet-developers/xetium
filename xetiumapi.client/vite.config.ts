import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "xetiumapi.client";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], {stdio: 'inherit',}).status) {
        throw new Error("Could not create certificate.");
    }
}

// https://vitejs.dev/config/

export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        define: {
            __API__: JSON.stringify(process.env.VITE_API),
            __IS_DEV__: JSON.stringify(process.env.VITE_IS_DEV)
        },
        plugins: [plugin()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '/account/register': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/account/login': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/account/info': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/project/create': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/project': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/scheduletask': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                },
                '/scheduletask/create': {
                    target: 'https://localhost:5000',
                    changeOrigin: true,
                    secure: false
                }
            },
            port: 5173,
            https: {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }
        }
    })
}
