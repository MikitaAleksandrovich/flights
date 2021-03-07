import React, { useState, useEffect } from 'react';

import { Flight, Checkbox } from './components';
import Logo from './images/Logo.png'
import { fetchData } from './api';
import { flightTabIndexes } from './constants/constants';
import { flightCheckboxes } from './constants/constants';
import styles from './App.module.css';

const App = () => {
    const [allTickets, setAllTickets] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(-1);
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (event) => {
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

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

// Get slowest flight from the list of flights
const getSegmentsDuration = flight => flight.segments[0].duration + flight.segments[1].duration;

const getSlowestFlight = data => data.length > 0 && data.reduce((acc, current) => {
  return getSegmentsDuration(acc) < getSegmentsDuration(current) ? acc : current;
})

console.log('slowestFlight', getSlowestFlight(allTickets));
console.log('checkedItems', checkedItems);
    
const handleTabIndex = (index) => {
  setActiveTabIndex(index);
    switch (index) {
      case 0:
        setTickets(tickets.filter((ticket) => ticket.price === Math.min(...tickets.map((ticket) => ticket.price))));
        break;
      default:
        setTickets(allTickets);
        break;
    }
  };

    return (
        <div className={styles.container}>
        <img className={styles.image} src={Logo} alt="app_logo" />
        <div className={styles.mainContainer}>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxHeader}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
            {
                flightCheckboxes.map(item => (
                    <label key={item.key} className={styles.checkbox}>
                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleCheckboxChange} />
                        <span className={styles.label}>{item.label}</span>
                    </label>
                ))
            }
          </div>
          <div className={styles.flightsContainer}>
            <div className={styles.tabs}>
              {flightTabIndexes.map((tab, index) => (
                  <div className={`${styles.tab} ${activeTabIndex === index && styles.activeTab}`} onClick={() => handleTabIndex(index)}>{tab}</div>
              ))}
            </div>
            {error ? <div className={styles.container}><div className={styles.errorMessage}>Что-то пошло не так, пожалуйста, обновите страницу</div></div> :
                tickets.map((ticket) => <Flight key={ticket.price} ticket={ticket}/>)
            }
          </div>
        </div>
    
    </div>
    )
}

export default App;
