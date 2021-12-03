const db = require("../db");
const Host = require("./models/Host");
const User = require("./models/User");
const Location = require("./models/Location");
const Tag = require("./models/Tag");


// ASSOCIATIONS
Tag.belongsTo(Location, { through: 'location_tag' }) // 1-1
Location.belongsToMany(Tag, { through: 'location_tag' }) // 1-n

Host.belongsToMany(Location, { through: 'host_location' })  // 1-n
Location.belongsTo(Host, { through: 'host_location' }) // 1-1

module.exports = {
  db,
  models: { User, Location, Tag, Host },
};
