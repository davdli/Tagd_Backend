const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Host = db.define('host', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
})

module.exports = Host;

Host.prototype.correctPassword = function (candidatePwd) {
    //we need to compare the plain version to an encrypted version of the password
    return bcrypt.compare(candidatePwd, this.password);
};

Host.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
Host.authenticate = async function ({ email, password }) {
    const host = await this.findOne({ where: { email } });
    if (!host || !(await host.correctPassword(password))) {
        const error = Error("Incorrect username/password");
        error.status = 401;
        throw error;
    }
    return host.generateToken();
};

Host.findByToken = async function (token) {
    try {
        const { id } = await jwt.verify(token, process.env.JWT);
        const host = Host.findByPk(id);
        if (!host) {
            throw "You are not a host. Register Please. Can change this later";
        }
        return host;
    } catch (ex) {
        const error = Error("bad token");
        error.status = 401;
        throw error;
    }
};

/**
 * hooks
 */
const hashPassword = async host => {
    //in case the password has been changed, we want to encrypt it with bcrypt
    if (host.changed("password")) {
        host.password = await bcrypt.hash(host.password, SALT_ROUNDS);
    }
};

Host.beforeCreate(hashPassword);
Host.beforeUpdate(hashPassword);
Host.beforeBulkCreate(hosts => Promise.all(hosts.map(hashPassword)));
