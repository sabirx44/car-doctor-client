import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import BookingRow from "./BookingRow";

const Booking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/bookings?email=${user.email}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [user]);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map(booking => <BookingRow key={booking._id} booking={booking} />)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Booking;