import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  // Making form input as controlled components by managing them in states
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  // state to manage empty fields
  const [emptyFieldError, setEmptyFieldError] = React.useState(false);

  // To navigate to another rout on demand
  const navigate = useNavigate();
  // To get the parameters of the url of current page
  const params = useParams();

  // To link form data with state formData
  function updateFormData(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

  // To get product details using url in the current page
  async function getProductDetails() {
    // params are used to access the componets of url of current page
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      // Set header to send Jwt authentication token which will be verified by middleware(verifyToken) in backend
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result) {
      // Autofills data of the product for which Update Product form is opened
      setFormData(result);
    }
  }

  // Used to autofill form data as the current product details
  React.useEffect(() => {
    getProductDetails();
  }, []);

  // Function to make update request to backend
  async function updateData(event) {
    event.preventDefault();
    event.stopPropagation();

    // To handle empty fields
    if (
      !formData.name ||
      !formData.category ||
      !formData.company ||
      !formData.price
    ) {
      setEmptyFieldError(true);
      return false;
    }

    let userID = JSON.parse(localStorage.getItem("user"))._id;
    let formData_with_userID = { ...formData, userID: userID };

    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "put",
      body: JSON.stringify(formData_with_userID),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result.modifiedCount > 0) {
      alert("Product Updated");
      navigate("/");
    }
  }

  return (
    <div className="signup">
      <h1>Update Product</h1>
      <form action="POST">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={updateFormData}
          name="name"
          value={formData.name}
        />

        {/* if there is a empty field display error */}
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

        <button type="submit" onClick={updateData}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
