const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
    include: [{
      model: Product,
      through: "ProductTag",
    }]
  }).then((tags) => {
    if(!tags) {
      res.json({message: "No tags data"});
    }
    res.json(tags)
  }).catch((err) => {
    res.json(err)
  })
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      through: "ProductTag",
    }]
  }).then((tagByid) => {
    if(!tagByid) {
      res.json({message: "cannot find tags with this id"});
    }
    res.json(tagByid)
  })
  .catch((err) => {
    res.json(err)
  })
  
})

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  }).catch((err) => {
    res.json(err);
  })
})

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body,
  {
    where: {
      id: req.params.id,
    },
  }).then((tag) => {
    res.json(tag)
  }).catch((err) => {
    res.json(err)
  })
})

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((removedTag) => {
    res.json(`${removedTag} deleated`);
  }).catch((err) => {
    res.json(err)
  })
})

module.exports = router;
