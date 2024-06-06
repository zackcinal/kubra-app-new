import { useState } from "react";
import { createOwner } from "../../Services/dogOwnerProfile.js";
import { useNavigate } from "react-router-dom";
import "./addowner.css"

function AddOwner({ user, accessToken, onAddOwnerSuccess }) {
  const [form, setForm] = useState({
    dog_owner: user?.id,
    name: "",
    address: "",
    phone_number: "",
    vet: "",
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
      const ownerData = {
        ...form,
        owner: user.id,
      };
      const createdOwner = await createOwner(ownerData, accessToken);
      setForm({
        dog_owner: user?.id,
        name: "",
        address: "",
        phone_number: "",
        vet: "",
        isError: false,
        errorMsg: "",
      });
      onAddOwnerSuccess();
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
      <div className="create-owner-container">
        <form className="create-owner-form" onSubmit={handleSubmit}>
          <input type="hidden" name="owner" value={form.owner} />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            className="dog-input"
            required
          />
          <span className="focus-border"></span>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            autoComplete="off"
            className="dog-input"
            required
          />
          <span className="focus-border"></span>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            placeholder="Your Phone Number"
            value={form.phone_number}
            onChange={handleChange}
            autoComplete="off"
            className="dog-input"
            required
          />
          <span className="focus-border"></span>
          <label htmlFor="vet">Vet</label>
          <input
            type="text"
            name="vet"
            id="vet"
            placeholder="Your Vet Information for Emergencies(Name, Number, Address)"
            value={form.vet}
            onChange={handleChange}
            autoComplete="off"
            className="dog-input"
            required
          />
          <span className="focus-border"></span>
          {form.isError && <p className="error-msg">{form.errorMsg}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddOwner;
