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
                title: "tony",
                description: "testtag",

                imageUrl: "https://media.istockphoto.com/photos/playing-card-ace-of-spades-picture-id166086175?k=20&m=166086175&s=612x612&w=0&h=07Kyk1dMYcgi_UPUKnSsv-mkZ1wg6UIlQRIoyAtyq2I="
            }
            const newTag = await Tag.create(tag);
            location.addTag(newTag);
            res.status(200).send(newTag);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
