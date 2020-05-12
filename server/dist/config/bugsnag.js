"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_1 = require("@bugsnag/js");
const plugin_express_1 = require("@bugsnag/plugin-express");
const bugsnagClient = js_1.default({
    apiKey: '05e6181845da22bbdbdee88ba4ef8641',
    appVersion: process.env.npm_package_version,
    releaseStage: process.env.BUGSNAG_STAGE || process.env.NODE_ENV,
});
exports.bugsnagClient = bugsnagClient;
bugsnagClient.use(plugin_express_1.default);
//# sourceMappingURL=bugsnag.js.map