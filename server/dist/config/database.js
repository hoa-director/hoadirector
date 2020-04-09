"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const logging = process.env.NODE_ENV === "development" ? console.log : false;
// const connectionOptions: Options = {
//   host: process.env.DATABASE_HOST,
//   dialect: 'mysql',
//   pool: {
//     max: 10,
//     min: 0,
//   },
//   define: {
//     underscored: true,
//     paranoid: true,
//   },
//   logging,
//   operatorsAliases: false,
// };
// class DatabaseConnection {
//   sequelize: Sequelize;
//   constructor() {
//     this.sequelize = new Sequelize(
//       process.env.DATABASE_DB,
//       process.env.DATABASE_USER,
//       process.env.DATABASE_PASSWORD,
//       connectionOptions,
//     );
//   }
class DatabaseConnection {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL);
    }
    testConnection() {
        this.sequelize
            .authenticate()
            .then(() => {
            console.log("connected to database");
        })
            .catch((error) => {
            console.log("There was an error connecting to the database");
            console.error(error);
        });
    }
}
exports.connection = new DatabaseConnection().sequelize;
exports.default = exports.connection;
//# sourceMappingURL=database.js.map