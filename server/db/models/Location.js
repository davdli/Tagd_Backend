const Sequelize = require("sequelize");
const db = require("../db");

const Location = db.define("location", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  houseImg: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  }
})

module.exports = Location;
