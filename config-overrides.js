module.exports = {
    webpack: function (config, env) {
        config.resolve.alias = {
            "@components": "./src/Components",
            "@modules": "./src/Modules",
            "@models": "./src/Models",
            "@helpers": "./src/Common/Helpers",
            "@constants": "./src/Common/Constants",
            "@redux": "./src/Redux",
            "@routing": "./src/Routing",
            "@config": "./src/Configs",
            "@i18n": "./src/I18n/index.ts",
            "@services": "./src/Services/index.ts",
            "@app-context": "./src/AppContext/index.ts",
        }
        return config;
    }
}