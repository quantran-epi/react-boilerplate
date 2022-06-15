const path = require("path");
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CracoLessPlugin = require('craco-less');

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    typescript: {
        enableTypeChecking: true /* (default value)  */
    },
    webpack: {
        alias: {},
        plugins: {},
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve.alias = {
                ...webpackConfig.resolve.alias,
                "@components": path.resolve(__dirname, "src/Components"),
                "@modules": path.resolve(__dirname, "src/Modules"),
                "@widgets": path.resolve(__dirname, "src/Widgets"),
                "@models": path.resolve(__dirname, "src/Models"),
                "@common": path.resolve(__dirname, "src/Common"),
                "@routing": path.resolve(__dirname, "src/Routing"),
                "@configs": path.resolve(__dirname, "src/Configs"),
                "@services": path.resolve(__dirname, "src/Services"),
                "@i18n": path.resolve(__dirname, "src/I18n/index"),
                "@app-context": path.resolve(__dirname, "src/AppContext/index"),
                "@hooks": path.resolve(__dirname, "src/Hooks/index"),
                "@store": path.resolve(__dirname, "src/Store/index"),
            }
            webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
            return webpackConfig;
        }
    },
    devServer: { /* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver */ },
    devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => { return devServerConfig; },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#f58220' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
};