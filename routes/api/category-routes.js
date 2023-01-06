const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
  .then((category) => {
    if (!category) {
      res.json({message: "There is no category data"});
      return;
    }
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
		include: [
			{
				model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
			}
		],
	})
  .then((categoryByid) => {
    if (!categoryByid) {
      res.json({message: "There is no category data"});
      return;
    }
    res.json(categoryByid);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/', async(req, res) => {
  // create a new category
  await Category.create(req.body)
	.then((newCategoryData) => {
      res.json(newCategoryData)
  })
	.catch((err) => {
		res.json(err);
	});
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update({
    id: req.params.id,
    category_name: req.body.category_name
  }, {
		where: {
			id: req.params.id,
		},
	})
  .then((updateCategory) => {
    if (!updateCategory) {
      res.json({message: "Cannot find category with this id"});
      return;
    }
    res.json(updateCategory)
  })
  .catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
		where: {
			id: req.params.id,
		},
	})
	.then((deleteCategory) => {
    if (!deleteCategory) {
      res.json({message: "Cannot find category with this id"});
      return;
    }
		res.json(deleteCategory);
	})
	.catch((err) => {
		res.json(err);
	});
});

module.exports = router;

