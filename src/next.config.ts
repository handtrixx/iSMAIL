const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');


// Read YAML configuration
const configPath = path.resolve('/app/config.yml');
const yamlContent = fs.readFileSync(configPath, 'utf8');
const config = yaml.load(yamlContent);

const appUrl = config.APP.URL;
const protocol = appUrl.split('://')[0];
const hostname = appUrl.split('://')[1].split('/')[0];


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol, // Type assertion
        hostname: hostname, // Extract the hostname
        pathname: '/**', // Allow all paths
      },
    ],
  },

  expireTime: 300,

};

export default nextConfig;