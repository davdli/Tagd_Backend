const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { Tag, Host } } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll({
            include: [{
                model: Host
            }]
        });
        res.status(200).send(tags)
    } catch (error) {
        next(error)
    }
});

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const singleTag = await Tag.findOne({
                include: Host,
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            await singleTag.destroy();
            res.status(202).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .put(async (req, res, next) => {
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            const { title, description, imageUrl } = req.body
            await singleTag.update({ title, description, imageUrl })
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const singleTag = await Tag.create(req.body)
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
