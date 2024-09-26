import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from './productsSlice';
import "bootstrap/dist/css/bootstrap.min.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, count } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  const total = Math.ceil(count / 10);

  const handlePages = (value) => {
    if (value >= 1 && value <= total) {
      setPage(value);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts({ page, limit: 10 }));
  }, [page, dispatch]);

  // 内联样式对象
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      borderBottom: '1px solid #ddd',
    },
    left: {
      margin: 0,
    },
    rightButton: {
      marginLeft: '10px',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gridGap: '20px',
      padding: '20px',
      listStyleType: 'none',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '20px',
    },
    pagination: {
      display: 'flex',
      listStyleType: 'none',
    },
    pageItem: {
      margin: '0 5px',
    }
  };

  return (
    <>
      <header style={styles.header}>
        <div className="left" style={styles.left}>
          <h2>Products</h2>
        </div>
        <div className="right">
          <button style={styles.rightButton}>Price: low to high</button>
          <button style={styles.rightButton}>Add Product</button>
        </div>
      </header>

      <main style={styles.productsGrid}>
        <ul>
          {Array.from(products).map((item, index) => (
            <li key={index}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </main>

      <footer style={styles.footer}>
        <nav aria-label="Page navigation">
          <ul style={styles.pagination}>
            <li style={styles.pageItem} className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePages(page - 1)}>
                Previous
              </button>
            </li>
            {[...Array(total)].map((_, index) => (
              <li style={styles.pageItem} key={index} className={`page-item ${page === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePages(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li style={styles.pageItem} className={`page-item ${page === total ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePages(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [button1, setButton1] = useState(true);
  const [button2, setButton2] = useState(true);
  const navigate = useNavigate();

  const handleToggle1 = () => setButton1(!button1);
  const handleToggle2 = () => setButton2(!button2);

  const handleClick = (value) => {
    let quantity1 = value === -1
      ? Math.max(quantity + value, 0)
      : Math.min(quantity + value, product.stock);
    setQuantity(quantity1);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setQuantity(Math.max(Math.min(value, product.stock), 0));
    }
  };

  const handleNavigator = () => {
    navigate(`/products/${product.id}`);
  };

  const styles = {
    productCard: {
      border: '1px solid #ddd',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    description: {
      color: '#888',
    },
    price: {
      fontWeight: 'bold',
      margin: '10px 0',
    },
    addButton: {
      backgroundColor: 'purple',
      color: 'white',
      padding: '5px 10px',
      border: 'none',
      cursor: 'pointer',
      marginRight: '10px',
    },
    quantityControl: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editButton: {
      padding: '5px 10px',
      margin: '0 5px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.productCard}>
      <img src={product.imageUrl} alt={product.name} onClick={handleNavigator} />
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>${product.price}</p>
      {button1 ? (
        <button style={styles.addButton} onClick={handleToggle1}>add</button>
      ) : (
        <div style={styles.quantityControl}>
          <button onClick={() => handleClick(1)}>+</button>
          <span>{quantity}</span>
          <button onClick={() => handleClick(-1)}>-</button>
        </div>
      )}
      {button2 ? (
        <button style={styles.editButton} onClick={handleToggle2}>edit</button>
      ) : (
        <div>
          <input type="number" value={quantity} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
