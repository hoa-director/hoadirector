import * as Sequelize from 'sequelize';

const logging = process.env.NODE_ENV === 'development'? true : false;

const connectionOptions: Sequelize.Options = {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0
    },
    define: {
        createdAt: false,
        updatedAt: false,
        underscored: true,
    },
    operatorsAliases: false,
    logging: logging,
};

class DatabaseConnection {
    sequelize: Sequelize.Sequelize;

    constructor() {
        this.sequelize = new Sequelize.Sequelize(process.env.DATABASE_DB, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, connectionOptions);
        this.testConnection();
    }

    testConnection() {
        this.sequelize.authenticate().then(() => {
            console.log('connected to database');
        }).catch((error) => {
            console.log('There was an error connecting to the database');
            console.error(error);
        });
    }
}
export default new DatabaseConnection().sequelize;