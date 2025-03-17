import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const ProductInfo = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost/product-backend/product_info.php?id=${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img 
        src={`http://localhost/product-backend/uploads/${product.image}`} 
        alt={product.name} 
        style={{ width: "200px", height: "200px" }} 
      />
      <p><b>Price: ${product.price}</b></p>
      <p>Rating: ⭐ {parseFloat(product.avg_rating).toFixed(1)} / 5</p>
      <p>({product.total_reviews} Reviews)</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>← Back</button>

    </div>
  );
};

export default ProductInfo;
