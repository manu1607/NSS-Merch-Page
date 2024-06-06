import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './styles.css';
//import Contact from './Contact';

const products = [
  {
    id: 1,
    name: 'Merch 1',
    description: 'Zipper (Black)-customizable',
    price: 549,
    image: '/images/image3.jpeg'
  },
  {
    id: 2,
    name: 'Merch 2',
    description: 'T-shirt (Black)-customizable',
    price: 325,
    image: '/images/image2.jpeg'
  },
  {
    id: 3,
    name: 'Merch 3',
    description: 'Hoodie (Light Blue)-customizable',
    price: 625,
    image: '/images/image1.jpg'
  }
];

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct.quantity > 1) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== product.id);
      }
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Router>
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Main products={products} addToCart={addToCart} />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
      <Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} total={getTotal()} />
    </Router>
  );
};

const Header = () => (
  <header>
    <h1>NSS Merch Page</h1>
  </header>
);

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
  </nav>
);

const Main = ({ products, addToCart }) => (
  <main>
    <h2>Products</h2>
    <ProductList products={products} addToCart={addToCart} />
  </main>
);

const ProductList = ({ products, addToCart }) => (
  <div className="product-list">
    {products.map(product => (
      <Product
        key={product.id}
        product={product}
        addToCart={addToCart}
      />
    ))}
  </div>
);

const Product = ({ product, addToCart }) => (
  <div className="product">
    <img src={product.image} alt={product.name} />
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>₹{product.price}</p>
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  </div>
);

const Cart = ({ cart, removeFromCart, addToCart, total }) => (
  <aside>
    <h2>Cart</h2>
    {cart.length === 0 ? (
      <p>No items in the cart</p>
    ) : (
      <>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <div className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price} x {item.quantity}</p>
                  <div className="item-quantity">
                    <button onClick={() => removeFromCart(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="total">Total: ₹{total}</p>
      </>
    )}
  </aside>
);

export default App;
