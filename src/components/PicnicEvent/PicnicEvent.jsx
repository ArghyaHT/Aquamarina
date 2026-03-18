"use client";
import { useRef, useState } from "react";
import styles from "./PicnicEvent.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";

const rides = [
    {
        id: 1,
        title: "Picnic Offer (Weekdays)",
        price: 499,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides.",
        spotPrice: 800
    },
    {
        id: 2,
        title: "Picnic Offer (Weekends)",
        price: 599,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides.",
        spotPrice: 900

    },
    {
        id: 3,
        title: "Family Pack",
        price: 699,
        image: "/passimage.jpg",
        description: "Min 10 people. Access to all rides.",
        spotPrice: 700

    },
];

const PicnicEvent = () => {

    const [dates, setDates] = useState({});
    const [quantities, setQuantities] = useState({});

    const dispatch = useDispatch();


    const dateRefs = useRef({});

    const handleDateChange = (id, value) => {
        setDates({ ...dates, [id]: value });
    };

    const openCalendar = (id) => {
        dateRefs.current[id]?.click();
    };

   const formatDate = (date) => {
     return moment(date || new Date())
       .format("DD-MMM-YYYY")
       .toUpperCase();
   };

    const today = new Date().toISOString().split("T")[0];

    const increaseQty = (id) => {
        const current = quantities[id] || 10;

        setQuantities({
            ...quantities,
            [id]: current + 1
        });
    };

    const decreaseQty = (id) => {
        const current = quantities[id] || 10;

        if (current === 20) return;

        setQuantities({
            ...quantities,
            [id]: current - 1
        });
    };

    const handleAddToCart = (ride) => {
      const quantity = quantities[ride.id] || 10;
      const date = dates[ride.id];
    
    //   if (!date) {
    //     alert("Please select a date");
    //     return;
    //   }
    
      dispatch(
        addToCart({
          id: ride.id,
          type: "picnic",
          title: ride.title,
          price: ride.price,
          image: ride.image,
          description: ride.description,
          spotPrice: ride.spotPrice,
          quantity,
          date,
          total: ride.price * quantity,
        })
      );
    };
    

    return (
        <section className={styles.section}>

            <h2>Events & Celebrations</h2>
            <p>
                Plan unforgettable picnics and celebrations with spacious areas, great food, and fun-filled attractions perfect for families, groups, and special occasions.
            </p>

            <div className={styles.grid}>

                {rides.map((ride) => (
                    <div key={ride.id} className={styles.card}>

                        {/* IMAGE */}
                        <div className={styles.imageWrapper}>
                            <img src={ride.image} alt={ride.title} />

                            <div className={styles.priceTag}>
                                <div className={styles.price}>₹{ride.price}/-</div>
                                <div className={styles.gst}>Including GST</div>
                                <div className={styles.person}>(For One Person)</div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className={styles.cardContent}>

                            <div className={styles.cardHeader}>
                                {/* Left Column: Title & Description */}
                                <div className={styles.titleDesc}>
                                    <h4>{ride.title}</h4>
                                    <p className={styles.description}>{ride.description}</p>
                                </div>

                                {/* Right Column: Price */}
                                <div className={styles.priceColumn}>
                                    <span className={styles.spotLabel}>Spot Price:</span>
                                    <span className={styles.spotPrice}>₹{ride.spotPrice}/-</span>
                                </div>
                            </div>

                            {/* BOOKING DATE */}
                            <div className={styles.field}>
                                <label>Booking Date :</label>

                                <div
                                    className={styles.dateBox}
                                    onClick={() => openCalendar(ride.id)}
                                >

                                    <div className={styles.calendarCircle}>
                                        <FaCalendarAlt />
                                    </div>

                                    <span className={styles.dateText}>
                                        {formatDate(dates[ride.id])}
                                    </span>

                                    <FiChevronDown className={styles.arrow} />

                                    <input
                                        ref={(el) => (dateRefs.current[ride.id] = el)}
                                        type="date"
                                        className={styles.hiddenDate}
                                        min={today}
                                        value={dates[ride.id] || ""}
                                        onChange={(e) =>
                                            handleDateChange(ride.id, e.target.value)
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                </div>
                            </div>

                            {/* PRICE + QUANTITY */}
                            <div className={styles.priceRow}>

                                <span className={styles.dynamicPrice}>
                                    Rs. - {(ride.spotPrice + ride.price * (quantities[ride.id] || 10)).toFixed(2)}
                                </span>

                                <div className={styles.quantityBox}>

                                    <button
                                        onClick={() => decreaseQty(ride.id)}
                                        className={styles.qtyBtn}
                                        disabled={(quantities[ride.id] || 10) === 10}
                                    >
                                        −
                                    </button>

                                    <span className={styles.qtyNumber}>
                                        {quantities[ride.id] || 10}
                                    </span>

                                    <button
                                        onClick={() => increaseQty(ride.id)}
                                        className={styles.qtyBtn}
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button className={styles.addBtn}
                            onClick={() => handleAddToCart(ride)}
                            >
                                Add To Cart
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default PicnicEvent;