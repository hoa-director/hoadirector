import * as Sequelize from 'sequelize';
import connection from '../config/database';

export const User = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'id'
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            max: 100
        },
        unique: true,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            max: 45
        },
        field: 'password'
    },
    username: {
        type: Sequelize.STRING,
        validate: {
            max: 45
        },
        field: 'username'
    }
});

export default User