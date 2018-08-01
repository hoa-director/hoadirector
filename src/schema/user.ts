import * as Sequelize from 'sequelize';
import connection from '../config/database';
import * as bcrypt from 'bcrypt';

const saltWorkFactor = 10;

export class User extends Sequelize.Model {

    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    public static encryptPassword(password: string) {
        const salt = bcrypt.genSaltSync(saltWorkFactor);
        return bcrypt.hashSync(password, salt);
    }

    public comparePassword (password: string) {
        return bcrypt.compareSync(password, this.password);
    }

    public static findByEmail(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { email } }).then( (user) => {
                resolve(user);
            }).catch(error => {
                reject(error);
            })
        });
        
    }
}

User.init(
    {
        id: {
            type: Sequelize.INTEGER({ length: 10}),
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            field: 'id',
        },
        email: {
            type: Sequelize.STRING(100),
            validate: {
                max: 100,
                isEmail: true
            },
            unique: true,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING(45),
            validate: {
                max: 45
            },
            field: 'password'
        },
    },
    { sequelize: connection }
);

User.beforeCreate((user, options) => {
    const encryptedPassword = User.encryptPassword(user.password);
    user.password = encryptedPassword;
})
// export interface UserAddModel {
//     email: string;
//     password: string;
// }

// export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
//     id: number;
//     email: string;
//     password: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface UserViewModel {
//     id: number;
//     email: string;
// }

// export const User = connection.define<UserModel, UserAddModel>('user', {
    // id: {
    //     type: Sequelize.INTEGER(10),
    //     primaryKey: true,
    //     unique: true,
    //     autoIncrement: true,
    //     field: 'id',
    // },
    // email: {
    //     type: Sequelize.STRING(100),
    //     validate: {
    //         max: 100,
    //         isEmail: true
    //     },
    //     unique: true,
    //     field: 'email'
    // },
    // password: {
    //     type: Sequelize.STRING(45),
    //     validate: {
    //         max: 45
    //     },
    //     field: 'password'
    // },
// });

export const userSchema = User;
export default User;
