import React, { useEffect, useState } from 'react';
import { getUserReservations } from '../../Services/reservations.js';  

function UserReservations({ userId }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getUserReservations(userId);
        setReservations(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div>
      <h2>User Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.reservation_type} on {reservation.reservation_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReservations;
