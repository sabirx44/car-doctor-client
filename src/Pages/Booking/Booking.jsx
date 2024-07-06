import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import BookingRow from "./BookingRow";

const Booking = () => {
  // Get user from AuthContext
  const { user } = useContext(AuthContext);
  // State to store bookings
  const [bookings, setBookings] = useState([]);

  // Fetch bookings when component mounts or user email changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings?email=${user.email}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [user.email]);

  // Handle booking deletion
  const handleDelete = async (id) => {
    if (window.confirm("Confirm Delete?")) {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.deletedCount > 0) {
          alert('Deleted successfully!');
          setBookings(bookings.filter(booking => booking._id !== id));
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  // Handle booking approval
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Approved' })
      });
      const data = await response.json();
      
      if (data.modifiedCount > 0) {
        const updatedBookings = bookings.map(booking => 
          booking._id === id ? { ...booking, status: 'Approved' } : booking
        );
        setBookings(updatedBookings);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <BookingRow 
              key={booking._id} 
              booking={booking} 
              handleDelete={handleDelete} 
              handleApprove={handleApprove} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;