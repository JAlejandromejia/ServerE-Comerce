const productsRouter = express.Router();

// Ruta raíz GET
productsRouter.get('/', async (req, res) => {
  const products = await ProductModel.find().limit(req.query.limit);
  res.json(products);
});

// Ruta GET /:pid
productsRouter.get('/:pid', async (req, res) => {
  const product = await ProductModel.findById(req.params.pid);
  res.json(product);
});

// Ruta POST /
productsRouter.post('/', async (req, res) => {
  const product = new ProductModel(req.body);
  await product.save();
  res.json(product);
});

// Ruta PUT /:pid
productsRouter.put('/:pid', async (req, res) => {
  const product = await ProductModel.findByIdAndUpdate(
    req.params.pid,
    req.body,
    {
      new: true,
    }
  );
  res.json(product);
});

// Ruta DELETE /:pid
productsRouter.delete('/:pid', async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.pid);
  res.json({ message: 'Producto eliminado' });
});

module.exports = productsRouter;