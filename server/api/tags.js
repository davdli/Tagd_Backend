const router = require('express').Router();
const Sequelize = require('sequelize');
const { models: { Tag, Location } } = require('../db');

// Get all tags
router.get('/', async (req, res, next) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).send(tags)
    } catch (error) {
        next(error)
    }
});

router.route('/:id')
    .get(async (req, res, next) => {
        // Get a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .put(async (req, res, next) => {
        //Edit a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            const { title, description, imageUrl } = req.body
            await singleTag.update({ title, description, imageUrl })
            res.status(200).send(singleTag);
        } catch (error) {
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        //Delete a single tag
        try {
            const singleTag = await Tag.findByPk(req.params.id);
            await singleTag.destroy();
            res.status(202).send(singleTag);
        } catch (error) {
            next(error);
        }
    });

router.route('/:locationId')
    .post(async (req, res, next) => {
        //Create a single tag
        try {
            const location = await Location.findByPk(req.params.locationId)
            console.log(req.body)
            const tag = {
                title: req.body,
                description: "tony",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/1200px-Playing_card_spade_2.svg.png"
            }
            const newTag = await Tag.create(tag);
            location.addTag(newTag);
            res.status(200).send(newTag);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
