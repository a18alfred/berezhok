const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.yandex.net',
        ],
    },
};

module.exports = nextConfig;
