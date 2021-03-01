import React, { useState, useEffect, useMemo } from 'react';

import { Flight } from './components';
import Logo from './images/Logo.png'
import { fetchData } from './api';
import { flightTabIndexes } from './constants/constants';
import styles from './App.module.css';

const App = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(-1);

    useEffect(() => {
        (async function() {
            try {
                const data = await fetchData();
                setTickets(data.tickets);
                setAllTickets(data.tickets);
            } catch (e) {
                setError(true);
            }
        })();
    }, []);

    const handleTabIndex = (index) => {
        setActiveTabIndex(index);
        switch (index) {
            case 0:
                setTickets(tickets.filter((ticket) => ticket.price === Math.min(...tickets.map((ticket) => ticket.price))));
                break;
            case 1:
                setTickets(allTickets);
                break;
            case 2:
                setTickets(allTickets);
                break;
            default:
                setTickets(allTickets);
                break;
        }
      };

    console.log('tickets', tickets)

    return (
        <div className={styles.container}>
        <img className={styles.image} src={Logo} alt="app_logo" />
        <div className={styles.tabs}>
            {flightTabIndexes.map((tab, index) => (
                <div className={`${styles.tab} ${activeTabIndex === index && styles.activeTab}`} onClick={() => handleTabIndex(index)}>{tab}</div>
            ))}
        </div>
        {error ? <div className={styles.container}><div className={styles.errorMessage}>Что-то пошло не так, пожалуйста, обновите страницу</div></div> :
            tickets.map((ticket) => <Flight key={ticket.price} ticket={ticket}/>)
        }
    </div>
    )
}

export default App;
