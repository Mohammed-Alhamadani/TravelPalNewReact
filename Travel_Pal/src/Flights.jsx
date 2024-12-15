import React, { useState } from 'react';
import axios from 'axios';

const Flights = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [yearMonth, setYearMonth] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

    const fetchFlights = async () => {
        if (!from || !to || !yearMonth) {
            return setError('From, To, and Year/Month are required');
        }

        try {
            const response = await axios.get(`/flights`, {
                params: { from, to, yearMonth },
            });
            setFlightData(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching flight data');
            setFlightData(null);
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Flight Information</h2>
            <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From (e.g. NYC)"
            />
            <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To (e.g. LAX)"
            />
            <input
                type="text"
                value={yearMonth}
                onChange={(e) => setYearMonth(e.target.value)}
                placeholder="Year-Month (e.g. 2024-05)"
            />
            <br />
            <br />
            <button className="Btn" onClick={fetchFlights}>
                Get Flights
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {flightData && (
                <div>
                    <h3>Flight Data</h3>
                    <pre>{JSON.stringify(flightData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Flights;
