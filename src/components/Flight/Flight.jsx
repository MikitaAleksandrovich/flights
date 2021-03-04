import React from 'react';
import { getFormattedPrice } from './utils/getFormattedPrice';
import { getConvertedDuration } from './utils/getConvertedDuration';
import moment from 'moment';

import styles from './Flight.module.css';

const Flight = ({ ticket }) => {
    return (
        <div className={styles.container}>
           <div className={styles.header}>
               <div className={styles.price}>{getFormattedPrice(ticket.price)}</div>
               <div className={styles.company}><img src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} alt="company_image"/></div>
           </div>
           {ticket.segments.map((segment) => (
                <div className={styles.info} key={segment.date}>
                <div className={styles.infoItem}>
                    <div className={styles.description}>{segment.origin} - {segment.destination}</div>
                    <div className={styles.item}>{moment(segment.date).format('h:mm')} - {moment(segment.date).add(getConvertedDuration(segment.duration, true), 'h:mm').format('h:mm')}</div>
                </div>
                <div className={styles.infoItem}>
                <div className={styles.description}>В ПУТИ</div>
                    <div className={styles.item}>{getConvertedDuration(segment.duration)}</div>
                </div>
                {segment.stops.length <= 0 ? <div className={styles.infoItem}>БЕЗ ПЕРЕСАДОК</div> : 
                    <div className={styles.infoItem}>
                        <div className={styles.description}>{segment.stops.length} ПЕРЕСАДКИ</div>
                        <div className={styles.item}>{segment.stops.join(', ')}</div>
                    </div>}
            </div>
           ))}
        </div>
    )
};

export default Flight;