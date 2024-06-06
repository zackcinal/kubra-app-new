import "./adddog.css"
import { useState } from "react";
import { createDog } from "../../Services/dogProfile.js";
import { useNavigate } from "react-router-dom";


function AddDog({ user, accessToken, onAddDogSuccess }) {
    const [form, setForm] = useState({
        owner: user?.first_name,
        name: "",
        breed: "",
        age: "",
        isError: false,
        errorMsg: "",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const dogData = {
            ...form,
            owner: user.id,
          };
          const createdDog = await createDog(dogData, accessToken);
          setForm({
            owner: user.first_name,
            name: "",
            breed: "",
            age: "",
            isError: false,
            errorMsg: "",
          });
          onAddDogSuccess();
          navigate("/profile");
        } catch (error) {
          console.error(error);
          setForm((prevForm) => ({
            ...prevForm,
            isError: true,
            errorMsg: "Invalid Credentials",
          }));
        }
      };
    
      return (
        <div>
          <div className="create-dog-container">
            <form className="create-dog-form" onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="owner"
                value={form.owner}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Dog's Name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                className="dog-input"
              />
              <span className="focus-border"></span>
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                name="breed"
                id="breed"
                placeholder="Your Dog's Breed"
                value={form.breed}
                onChange={handleChange}
                autoComplete="off"
                className="dog-input"
              />
              <span className="focus-border"></span>
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Enter Your Dog's Age"
                value={form.age}
                onChange={handleChange}
                autoComplete="off"
                className="dog-input"
              />
              <span className="focus-border"></span>
              {form.isError && <p className="error-msg">{form.errorMsg}</p>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )    
}

export default AddDog