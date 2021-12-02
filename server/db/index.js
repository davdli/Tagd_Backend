const db = require("../db");
const User = require("./models/User");
const Location = require("./models/Location");
const Tag = require("./models/Tag");
const Host = require("./models/Host");

// ASSOCIATIONS
Tag.belongsTo(Location, { through: 'location_tag' }) // 1-1
Location.belongsToMany(Tag, { through: 'location_tag' }) // 1-n

Host.belongsToMany(Location, { through: 'host_location' })  // 1-n
Location.belongsTo(Host, { through: 'host_location' }) // 1-1

module.exports = {
  db,
  models: { User, Location, Tag, Host },
};
