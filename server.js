const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Configuración de body-parser
app.use(bodyParser.json());

// Configuración de mongoose
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });

// Definición de modelos
const ProductModel = mongoose.model('Product', {
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: [String] },
});

const CartModel = mongoose.model('Cart', {
  id: { type: String, required: true },
  products: { type: [ProductModel] },
});

// Definición de rutas
app.use('/api/products', require('./routes/products'));
app.use('/api/carts', require('./routes/carts'));

// Escucha de peticiones
app.listen(8080);