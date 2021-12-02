const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { Tag, Location } } = require('../db');

module.exports = router;

// get all locations
// needs more work
router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
});

router.route('/:id')
  .get(async (req, res, next) => {
    // get single location with tags assigned to it
    try {
      const location = await Location.findOne({
        include: Tag,
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    // add location
    try {
      const newLocation = await Location.create(req.body);
      res.status(200).json(newLocation);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    // delete location
    try {
      const deletedLocation = await Location.findByPk(req.params.id);
      await deletedLocation.destroy();
      res.status(200).json(deletedLocation);
    } catch (error) {
      next(error);
    }
  });
