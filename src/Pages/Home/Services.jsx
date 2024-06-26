import { useEffect } from "react";
import { useState } from "react";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data));
    })

    return (
        <div>
            <div>
                <h6 className="text-xl text-[#FF3811]">Service</h6>
                <h2 className="text-5xl	font-bold">Our Service Area</h2>
            </div>
            <div>
                <p>Services: {services.length}</p>
            </div>
        </div>
    );
};

export default Services;