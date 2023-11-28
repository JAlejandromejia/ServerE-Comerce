const cartsRouter = express.Router();

// Ruta raíz POST
cartsRouter.post('/', async (req, res) => {
  const cart = new CartModel();
  await cart.save();
  res.json(cart);
});

// Ruta GET /:cid
cartsRouter.get('/:cid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  res.json(cart);
});

// Ruta POST /:cid/product/:pid
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  const product = await ProductModel.findById(req.params.pid);

  // Si el producto ya existe en el carrito, incrementamos su cantidad
  if (cart.products.some((p) => p.id === product.id)) {
    const productInCart = cart.products.find((p) => p.id === product.id);
    productInCart.quantity++;
  } else {
    // Si el producto no existe en el carrito, lo agregamos
    cart.products.push({ id: product.id, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

module.exports = cartsRouter;