const path = require("path");

module.exports = {
    webpack: function (config, env) {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@components": path.resolve(__dirname, "src/Components"),
            "@modules": path.resolve(__dirname, "src/Modules"),
            "@widgets": path.resolve(__dirname, "src/Widgets"),
            "@models": path.resolve(__dirname, "src/Models"),
            "@common": path.resolve(__dirname, "src/Common"),
            "@redux": path.resolve(__dirname, "src/Redux"),
            "@routing": path.resolve(__dirname, "src/Routing"),
            "@configs": path.resolve(__dirname, "src/Configs"),
            "@services": path.resolve(__dirname, "src/Services"),
            "@i18n": path.resolve(__dirname, "src/I18n/index"),
            "@app-context": path.resolve(__dirname, "src/AppContext/index"),
            "@hooks": path.resolve(__dirname, "src/Hooks/index"),
        }
        return config;
    }
}