const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    // Entry points for the application
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Output configuration
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Plugins configuration
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Path to the HTML template
        title: 'JATE', // Title of the app
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Source of your service worker file
        swDest: 'service-worker.js', // Destination of the service worker in the output directory
      }),
      new WebpackPwaManifest({
        fingerprints: false, // Do not append unique fingerprints to the generated manifest URLs
        inject: true, // Automatically inject the manifest into the html
        name: 'Just Another Text Editor', // Name of the app
        short_name: 'JATE', // Short name of the app
        description: 'A simple text editor that works offline!', // Description of the app
        background_color: '#ffffff', // Background color of the app
        theme_color: '#317EFB', // Theme color of the app
        start_url: '/', // Start URL of the app
        publicPath: '/', // Public path of the app
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to your app's icon
            sizes: [96, 128, 192, 256, 384, 512], // Different sizes of the icon
            destination: path.join('assets', 'icons'), // Destination of the icons in the output directory
          },
        ],
      }),
    ],
    // Module rules for processing different types of files
    module: {
      rules: [
        {
          test: /\.css$/, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for CSS files
        },
        {
          test: /\.js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude the node_modules directory
          use: {
            loader: 'babel-loader', // Use babel-loader for JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Use @babel/preset-env preset for transpiling
              plugins: ['@babel/plugin-transform-runtime'], // Use @babel/plugin-transform-runtime for optimizing
            },
          },
        },
      ],
    },
  };
};
