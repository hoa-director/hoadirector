import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';

const saltWorkFactor = 10;

export class User extends Sequelize.Model {
    id: number;
    email: string;
    private password: string;
    number: number;
    role: number;
    firstName: string;
    lastName: string;
    fullName: string;
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

    public static findByEmail(email: string, include?): Promise<User> {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { email }}).then((user) => {
                resolve(user);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public static init(sequelize) {
        super.init(
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
                    field: 'email',
                },
                password: {
                    type: Sequelize.STRING(45),
                    validate: {
                        max: 45
                    },
                    field: 'password',
                },
                number: {
                    type: Sequelize.INTEGER({ length: 11 }),
                    field: 'number',
                },
                role: {
                    type: Sequelize.INTEGER({ length: 2 }),
                    field: 'role',
                },
                firstName: {
                    type: Sequelize.STRING(45),
                    field: 'first_name',
                },
                lastName: {
                    type: Sequelize.STRING(45),
                    field: 'last_name',
                },
                fullName: {
                    type: Sequelize.STRING(91),
                    field: 'full_name',
                }
            }, { sequelize }
        );
        User.beforeCreate((user, options) => {
            console.log(user);
            const encryptedPassword = User.encryptPassword(user.password);
            user.password = encryptedPassword;
        });
    };
};

export const UserSchema = User;
export default User;
