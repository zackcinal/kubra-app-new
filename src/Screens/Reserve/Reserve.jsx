import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "./reserve.css";
import {
  makeReservation,
  getUserReservations,
  deleteReservation,
} from "../../Services/reservations.js";
import Lottie from "lottie-react";
import DogAnimation from "../../Assets/dog-animation.json";
import emailjs from "emailjs-com";

const WALKS = [
  { value: "M", label: "Morning" },
  { value: "L", label: "Lunch" },
  { value: "D", label: "Dinner" },
  { value: "S", label: "Sitting" },
];

function Reserve({ user }) {
  const [value, setValue] = useState([]); // Change to an array for multiple dates
  const [reservationType, setReservationType] = useState(WALKS[1].value); // Default to 'Lunch'
  const [message, setMessage] = useState("");
  const [timerProgress, setTimerProgress] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [cancelMessage, setCancelMessage] = useState("");
  const [cancelTimerProgress, setCancelTimerProgress] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetchUserReservations();
    }
  }, [user]);

  const fetchUserReservations = async () => {
    try {
      const userReservations = await getUserReservations(user.id);
      setReservations(userReservations);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    }
  };

  const [form, setForm] = useState({
    customer: user?.id,
    reservationDates: [], // Update to array for multiple dates
    reservationType: WALKS[1].value, // Default to 'Lunch'
    isError: false,
    errorMsg: "",
  });

  const onChange = (date) => {
    const dateString = date.toDateString();
    if (value.find((d) => d.toDateString() === dateString)) {
      setValue(value.filter((d) => d.toDateString() !== dateString));
    } else {
      setValue([...value, date]);
    }
  };

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      reservationDates: value,
    }));
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reservationData = {
        customer: user.id,
        reservation_dates: value.map(
          (date) => date.toISOString().split("T")[0]
        ), // Send multiple dates
        reservation_type: form.reservationType,
      };
      await makeReservation(reservationData);

      // Send email using EmailJS
      const templateParams = {
        to_name: user.first_name,
        reservation_dates: value
          .map((date) => date.toLocaleDateString())
          .join(", "), // Format for email
        reservation_type: form.reservationType,
      };

      emailjs
        .send(
          "service_2yo5wni",
          "template_1jl9odl",
          templateParams,
          "vwExM1QWtRUVXrlqG"
        )
        .then(
          (response) => {
            console.log(
              "Email sent successfully!",
              response.status,
              response.text
            );
          },
          (error) => {
            console.error("Failed to send email", error);
          }
        );

      // Reset form after submission
      setForm({
        customer: user?.id,
        reservationDates: [],
        reservationType: WALKS[1].value,
        isError: false,
        errorMsg: "",
      });
      setValue([]); // Clear selected dates
      setMessage(
        "We have received your request. We will send you a confirmation message soon."
      );
      setTimerProgress(100);

      const interval = setInterval(() => {
        setTimerProgress((prevProgress) => {
          const newProgress = prevProgress - 100 / 30;
          if (newProgress <= 0) {
            clearInterval(interval);
            setMessage("");
            return 0;
          }
          return newProgress;
        });
      }, 400);

      fetchUserReservations();
    } catch (error) {
      console.error(error);
      setForm((prevForm) => ({
        ...prevForm,
        isError: true,
        errorMsg: "Failed to make reservation",
      }));
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm("Are you sure you want to cancel your reservation?")) {
      try {
        await deleteReservation(reservationId);

        // Send email using EmailJS
        const templateParams = {
          to_name: user.first_name,
          reservation_dates: form.reservationDates
            .map((date) => date.toLocaleDateString())
            .join(", "),
        };

        emailjs
          .send(
            "service_2yo5wni",
            "template_fxww3oe",
            templateParams,
            "vwExM1QWtRUVXrlqG"
          )
          .then(
            (response) => {
              console.log(
                "Cancellation email sent successfully!",
                response.status,
                response.text
              );
            },
            (error) => {
              console.error("Failed to send cancellation email", error);
            }
          );

        setCancelMessage("Your reservation was cancelled successfully.");
        setCancelTimerProgress(100);

        const interval = setInterval(() => {
          setCancelTimerProgress((prevProgress) => {
            const newProgress = prevProgress - 100 / 30;
            if (newProgress <= 0) {
              clearInterval(interval);
              setCancelMessage("");
              return 0;
            }
            return newProgress;
          });
        }, 300);

        fetchUserReservations();
      } catch (error) {
        console.error("Failed to delete reservation", error);
      }
    }
  };

  return (
    <div>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={value}
          selectRange={false} // Disable range selection
        />
        <p>
          Selected Dates:{" "}
          {value.length > 0
            ? value.map((date) => date.toLocaleDateString()).join(", ")
            : "None"}
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="reservation-form">
          <input type="hidden" name="customer" value={user?.id} />
          <input
            type="hidden"
            name="reservationDates"
            value={value
              .map((date) => date.toISOString().split("T")[0])
              .join(", ")} // Send multiple dates as a string
          />
          <label>
            Reservation Type:
            <select
              name="reservationType"
              value={reservationType}
              onChange={(e) => {
                setReservationType(e.target.value);
                // No need to call handleChange here
              }}
            >
              {WALKS.map((walk) => (
                <option key={walk.value} value={walk.value}>
                  {walk.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Request the Walk</button>
        </form>
        {form.isError && <p>{form.errorMsg}</p>}
        {message && (
          <div>
            <p>{message}</p>
            <div className="timer-bar">
              <div
                className="timer-bar-progress"
                style={{ width: `${timerProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {cancelMessage && (
          <div>
            <p>{cancelMessage}</p>
            <div className="timer-bar">
              <div
                className="timer-bar-progress"
                style={{ width: `${cancelTimerProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h2 className="upcoming-header">Your Upcoming Walk Requests</h2>
        {reservations.length === 0 ? (
          <div>
            <h4 className="nothing-to-see">Nothing to see here, yet...</h4>
            <Lottie
              animationData={DogAnimation}
              className="lottie"
              loop={true}
            />
          </div>
        ) : (
          <ul className="reservations-list">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="reservations-list-item">
                {reservation.reservation_type} walk on{" "}
                {new Date(reservation.reservation_date).toLocaleDateString()}
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reserve;
