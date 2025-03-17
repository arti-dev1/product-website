import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost/product-backend/getProducts.php")
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Product List</h1>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : products.length === 0 ? (
                <div className="alert alert-warning text-center">
                    No products found.
                </div>
            ) : (
                <div className="row">
                    {products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                            <Link to={`/product/${product.id}`}>
                                <img 
                                    src={`http://localhost/product-backend/uploads/${product.image}`} 
                                    alt={product.name} 
                                    className="card-img-top" 
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">
                                        Price: <strong>${product.price}</strong>
                                    </p>

                                </div> 
                            </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
