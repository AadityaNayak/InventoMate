import React from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [emptyFieldError, setEmptyFieldError] = React.useState(false);

  const navigate = useNavigate();

  
  function updateFormData(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

  // on submit
  async function submitData(event) {
    event.preventDefault();
    event.stopPropagation();

    if (
      !formData.name ||
      !formData.category ||
      !formData.company ||
      !formData.price
    ) {
      setEmptyFieldError(true);
      return false;
    }

    // to get user id of the current user who is adding the product
    let userID = JSON.parse(localStorage.getItem("user"))._id;
    let formData_with_userID = { ...formData, userID: userID };

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify(formData_with_userID),
      // Set header to send Jwt authentication token which will be verified by middleware(verifyToken) in backend
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    console.log(result);
    if (result) {
      navigate("/add-product");
    }
  }

  return (
    <div className="signup">
      <h1>Add Product</h1>
      <form action="POST">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={updateFormData}
          name="name"
          value={formData.name}
        />
        {emptyFieldError && !formData.name && (
          <span className="invalid-input">Enter valid name</span>
        )}
        <label htmlFor="price">Price: </label>
        <input
          type="text"
          placeholder="Enter price"
          onChange={updateFormData}
          name="price"
          value={formData.price}
        />
        {emptyFieldError && !formData.price && (
          <span className="invalid-input">Enter valid price</span>
        )}
        <label htmlFor="category">Category: </label>
        <input
          type="text"
          placeholder="Enter category"
          onChange={updateFormData}
          name="category"
          value={formData.category}
        />
        {emptyFieldError && !formData.category && (
          <span className="invalid-input">Enter valid category</span>
        )}
        <label htmlFor="company">Comapny: </label>
        <input
          type="text"
          placeholder="Enter company"
          onChange={updateFormData}
          name="company"
          value={formData.company}
        />
        {emptyFieldError && !formData.company && (
          <span className="invalid-input">Enter valid company</span>
        )}

        <button type="submit" onClick={submitData}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
