const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
    "@emotion/react",
    "@emotion/styled",
    "@hookform/resolvers",
    "@mui/icons-material",
    "@mui/material",
    "@mui/styles",
    "@reduxjs/toolkit",
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "axios",
    "lodash",
    "react",
    "react-dom",
    "react-hook-form",
    "react-icons",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-logger",
    "redux-persist",
    "redux-saga",
    "styled-components",
    "typewriter-effect",
    "uuid",
    "web-vitals",
    "yup"
];

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production';

module.exports = {
    mode,
    entry: {
        bundle: './src/index.tsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
                    }
                },
                test: /\.(ts|js)x?$/,
                exclude: '/node_modules/'
            },
            {
                use: [
                    'style-loader',
                    'css-loader',
                ],
                test: /\.css$/
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
}