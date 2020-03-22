import { Sequelize, Options } from 'sequelize';

const logging = process.env.NODE_ENV === 'development' ? console.log : false;

const connectionOptions: Options = {
  host: process.env.DATABASE_HOST,
  // host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
  },
  define: {
    underscored: true,
    paranoid: true,
  },
  // operatorsAliases: false,
  logging,
};



class DatabaseConnection {
  sequelize: Sequelize;
  
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DATABASE_DB,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      connectionOptions,
    );
  }

  testConnection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log('connected to database');
      })
      .catch((error) => {
        console.log('There was an error connecting to the database');
        console.error(error);
      });
  }
}

export const connection = new DatabaseConnection().sequelize;
export default connection;
