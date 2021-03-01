import React, { useState, useEffect } from 'react';

import { Flight } from './components';
import Logo from './images/Logo.png'
import { fetchData } from './api';
import { flightTabIndexes } from './constants/constants';
import styles from './App.module.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        (async function() {
            try {
                const data = await fetchData();
                setTickets(data.tickets);
            } catch (e) {
                setError(true);
            }
        })();
    }, []);

    const handleTabIndex = (index) => {
        setActiveTabIndex(index);
      };

    return (
        <div className={styles.container}>
        <img className={styles.image} src={Logo} alt="app_logo" />
        <div className={styles.tabs}>
            {flightTabIndexes.map((tab, index) => (
                <div className={`${styles.tab} ${activeTabIndex === index && styles.activeTab}`} onClick={() => handleTabIndex(index)}>{tab}</div>
            ))}
        </div>
        {error ? <div className={styles.container}>Что-то пошло не так, пожалуйста, обновите страницу</div> :
            tickets.map((ticket) => <Flight key={ticket.price} ticket={ticket}/>)
        }
    </div>
    )
}

export default App;
