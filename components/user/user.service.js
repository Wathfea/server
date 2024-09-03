const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.prisma = new PrismaClient();
    }

    addUser = async (user) => {
        const SALT_ROUNDS = 10;
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        if (user.code === 'VFS-Y23X0') {
            user.isPayed = true;
        }

        delete user.code;

        const data = {
            ...user,
            password: hashedPassword,
        };

        const {password, ...createdUser} = await this.prisma.user.create({
            data,
        });
        return createdUser;
    };

    getUsers = () => this.prisma.user.findMany({
        select: {
            id: true,
            email: true,
        },
    });

    getUser = (id) => this.prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            email: true,
        },
    });

    getUserByEmail = (email) => this.prisma.user.findUnique({
        where: {email},
    });

    isUserPayed = (id) => this.prisma.user.findUnique({
        where: {id, isPayed: true},
        select: {
            id: true,
            email: true,
        },
    });
}

module.exports = UserService;
