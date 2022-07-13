"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const db = {};
const sequelize = new sequelize_1.Sequelize(config_1.default.DB, config_1.default.USER, config_1.default.PASSWORD, {
    host: config_1.default.HOST,
    dialect: config_1.default.dialect,
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
module.exports = db;
//# sourceMappingURL=index.js.map