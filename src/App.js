import React, { Component } from 'react';

import { Flight } from './components';
import Logo from './images/Logo.png'
import { fetchData } from './api';
import styles from './App.module.css';

class App extends Component {

    state = {
        tickets: [],
        error: false,
    }

    async componentDidMount() {
        try {
            const fetchedData = await fetchData();
            this.setState({
                tickets: fetchedData.tickets,
                error: false,
             })
        } catch (error) {
            this.setState({
                error: true,
                tickets: [],
             })
        }
    }

    render() {

        const { tickets, error } = this.state;

        return(
            <div className={styles.container}>
                <img className={styles.image} src={Logo} />
                {error ? <div className={styles.container}>Что-то пошло не так, пожалуйста, обновите страницу</div> :
                    tickets.map((ticket) => <Flight key={ticket.price} ticket={ticket}/>)
                }
            </div>
        )
    }
};

export default App;