"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getIndex(req, res, next) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    init() {
        this.router.get('*', this.getIndex);
    }
}
exports.IndexRouter = IndexRouter;
const indexRoutes = new IndexRouter().router;
exports.default = indexRoutes;
//# sourceMappingURL=index.js.map