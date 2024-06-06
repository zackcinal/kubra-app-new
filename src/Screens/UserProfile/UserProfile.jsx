import "./userprofile.css";
import { useEffect, useState } from "react";
import { getDog, deleteDog } from "../../Services/dogProfile.js";
import { getOwner } from "../../Services/dogOwnerProfile.js";
import { useNavigate } from "react-router-dom";
import AddDog from "../../Components/AddDog/AddDog.jsx";
import AddOwner from "../../Components/AddOwner/AddOwner";

function UserProfile({ user, accessToken }) {
  const [dog, setDog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [addDogModalIsOpen, setAddDogModalIsOpen] = useState(false);
  const [addOwnerModalIsOpen, setAddOwnerModalIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const fetchedDog = await getDog(user?.id, accessToken);
        setDog(fetchedDog);
      } catch (error) {
        console.error("Error fetching dog:", error);
      }
    };

    fetchDog();
  }, [user?.id, accessToken]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const fetchedOwner = await getOwner(user.id, accessToken);
        setOwner(fetchedOwner);
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };

    fetchOwner();
  }, [user?.id, accessToken]);

  console.log(owner);

  const handleDeleteDog = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete your dog's information?"
      );
      if (confirmation) {
        await deleteDog(dog[0].id, accessToken);
        setDog(null);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  const handleAddDogSuccess = async () => {
    try {
      const fetchedDog = await getDog(user?.id, accessToken);
      setDog(fetchedDog);
    } catch (error) {
      console.error("Error fetching dog:", error);
    }
  };

  const openAddDogModal = () => {
    setAddDogModalIsOpen(true);
  };

  const openAddOwnerModal = () => {
    setAddOwnerModalIsOpen(true);
  };

  const closeAddDogModal = () => {
    setAddDogModalIsOpen(false);
  };

  const closeAddOwnerModal = () => {
    setAddOwnerModalIsOpen(false);
  };

  return (
    <div>
      <div className="user-info">
        <h3>
          {user?.first_name} {user?.last_name}
        </h3>
        <h6>{user?.username}</h6>
        <h6>{user?.email}</h6>
      </div>
      <div className="information-container">
        <div className="add-dog-form">
          <button onClick={openAddDogModal}>Add Your Dog</button>
          {addDogModalIsOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeAddDogModal}>
                  Close
                </span>
                <AddDog
                  user={user}
                  accessToken={accessToken}
                  onAddDogSuccess={handleAddDogSuccess}
                  onRequestClose={closeAddDogModal}
                />
              </div>
            </div>
          )}
        </div>
        <div className="add-owner-form">
          <button onClick={openAddOwnerModal}>Add Your Information</button>
          {addOwnerModalIsOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeAddOwnerModal}>
                  Close
                </span>
                <AddOwner
                  user={user}
                  accessToken={accessToken}
                  onAddOwnerSuccess={handleAddDogSuccess}
                  onRequestClose={closeAddOwnerModal}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {dog && (
        <div className="dog-info">
          <h2>Your Dog🐶</h2>
          <p>Name: {dog[0]?.name}</p>
          <p>Breed: {dog[0]?.breed}</p>
          <p>Age: {dog[0]?.age}</p>
          <button onClick={handleDeleteDog} className="delete-dog-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#e32400"
              viewBox="0 0 256 256"
            >
              <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
