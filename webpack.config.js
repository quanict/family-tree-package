const path = require('path');
const tsLoader = {
    loader: "ts-loader",
    options: {
        appendTsSuffixTo: [/\.api$/],
        resolveModuleName: (moduleName, containingFile, compilerOptions, compilerHost, parentResolver) => {
            if (/\.api$/.test(moduleName)) {
                const fileName = path.resolve(path.dirname(containingFile), moduleName);
                return {
                    resolvedModule: {
                        originalFileName: fileName,
                        resolvedFileName: fileName + '.ts',
                        resolvedModule: undefined,
                        isExternalLibraryImport: false,
                    },
                    failedLookupLocations: [],
                };
            }
            return parentResolver(moduleName, containingFile, compilerOptions, compilerHost);
        },
    },
};

module.exports = {
    mode: "development",
    entry: [
        './resources/assets/ts/index.ts',
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                  },
                  {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                  },
                  {
                    loader: 'scss-loader',
                    options: { sourceMap: true }
                  },
                  {
                    loader: 'file-loader',
                    options: { outputPath: 'css/', name: '[name].min.css'}
                },
                ],
              },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
           }
    },
    output: {
        filename: 'typescript.js',
        path: path.resolve(__dirname, 'resources/public/js'),
    },
};