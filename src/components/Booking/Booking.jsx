import React from 'react'
import styles from './Booking.module.css'
import BookingTabs from '../BookingTabs/BookingTabs'

const Booking = () => {
    return (
        <>
            {/* Hero */}
            <section className={styles.hero}>
                <img src="/waterpark.jpg" className={styles.heroImg} />

                <div className={styles.overlay}></div>

                <div className={styles.heroContent}>
                    <h2>Ready for a Splash?</h2>
                    <p>
                        Book your day of adventure. From thrilling slides to lazy rivers,
                        we have the perfect experience for every water lover.
                    </p>
                </div>
            </section>
            <BookingTabs />
        </>
    )
}

export default Booking