const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { User } } = require('../db');

// all users
router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ['firstName', 'lastName', 'email']
      });
      res.send(users);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      next(error);
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.sendStatus(202);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { firstName, lastName, email } = req.body
      const update = { firstName, lastName, email }
      const user = await User.findByPk(req.params.id)

      if (user) {
        await user.update(update)
        const newUser = await User.findOne({
          where: { id: req.params.id },
          attributes: ["id", "firstName", "lastName", "email"]
        })
        res.send(newUser)
      } else {
        res.sendStatus(404)
      }
    } catch (error) {
      next(error)
    }
  })
})

module.exports = router;
