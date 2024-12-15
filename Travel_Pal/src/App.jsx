import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Weather from './Weather';
import Flights from './Flights';

const App = () => {
    return (
        <div>
            <Header />
            <main style={{ padding: '20px' }}>
                <Weather />
                <Flights />
            </main>
            <Footer />
        </div>
    );
};

export default App;
