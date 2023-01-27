import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Products() {
  // State to store products list
  let [products_list, setProducts_list] = React.useState([]);

  // To get product list
  async function getProductsList() {
    let products_list = await fetch("http://localhost:5000/products", {
      // Set header to send Jwt authentication token which will be verified by middleware(verifyToken) in backend
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    products_list = await products_list.json();
    setProducts_list(products_list);
  }

  async function deleteProduct(id) {
    let deleted_id = await fetch(`http://localhost:5000/products/${id}`, {
      method: "delete",
      body: JSON.stringify({ _id: id }),
      // Set header to send Jwt authentication token which will be verified by middleware(verifyToken) in backend
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    deleted_id = await deleted_id.json();

    if (deleted_id) {
      alert("Product deleted");
      getProductsList();
    }
  }

  // To build the list
  function listLoader() {
    let index = 0;

    if (products_list.length > 0) {
      let pl = products_list.map((element) => {
        index = index + 1;
        return (
          <ul key={element._id}>
            <li>{index}</li>
            <li>{element.name}</li>
            <li>{element.category}</li>
            <li>{element.company}</li>
            <li>{element.price}</li>
            <li>
              <button
                onClick={() => {
                  deleteProduct(element._id);
                }}
              >
                Delete
              </button>
            </li>
            <li>
              (<Link to={`/update/${element._id}`}>Update</Link>)
            </li>
          </ul>
        );
      });
      return pl;
    } else {
      return <h1>No Products Found</h1>;
    }
  }

  // To handle searching
  async function handleSearch(event) {
    event.preventDefault();
    event.stopPropagation();

    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        // Set header to send Jwt authentication token which will be verified by middleware(verifyToken) in backend
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result) {
        setProducts_list(result);
      }
    } else {
      getProductsList();
    }
  }

  React.useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="products-list">
      <input
        type="text"
        placeholder="Search Product"
        className="searchp"
        onChange={handleSearch}
      />
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Category</li>
        <li>Company</li>
        <li>Price</li>
        <li>Delete Product</li>
        <li>Update Product</li>
      </ul>
      {listLoader()}
    </div>
  );
}

export default Products;
