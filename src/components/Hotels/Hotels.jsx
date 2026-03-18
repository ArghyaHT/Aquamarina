"use client";
import { useRef, useState } from "react";
import styles from "./Hotels.module.css";
import { FiChevronDown } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import moment from "moment";

const rides = [
  {
    id: 1,
    title: "Log Hut Premium",
    price: 3499,
    image: "/loghut.jpg",
    description: "Max 2 Adult & 1 Child."
  },
  {
    id: 2,
    title: "Pool Facing",
    price: 2299,
    image: "/poolfacing.jpg",
    description: "Max 2 Adult & 1 Child."
  },
  {
    id: 3,
    title: "Garden Facing",
    price: 699,
    image: "/gardenfacing.jpg",
    description: "Max 2 Adult & 1 Child."
  }
];

const Hotels = () => {

  const getDefaultDates = () => {
    const defaults = {};

    rides.forEach((ride) => {
      const checkIn = moment().format("YYYY-MM-DD");
      const checkOut = moment().add(1, "day").format("YYYY-MM-DD");

      defaults[`in-${ride.id}`] = checkIn;
      defaults[`out-${ride.id}`] = checkOut;
    });

    return defaults;
  };

  const [dates, setDates] = useState(getDefaultDates());
  const [guests, setGuests] = useState({});
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();

  const dateRefs = useRef({});

  const today = new Date().toISOString().split("T")[0];

  const calculateDays = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;

    const start = moment(checkIn);
    const end = moment(checkOut);

    const days = end.diff(start, "days");

    console.log(days)
    // Minimum 1 day booking
    return days <= 0 ? 1 : days;
  };
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

  const formatNextDate = (date) => {
    return moment(date || moment().add(1, "day"))
      .format("DD-MMM-YYYY")
      .toUpperCase();
  };

  /* ======================
     ADULT HANDLERS
  ====================== */

  const increaseAdult = (id) => {
    const current = guests[id]?.adults ?? 1;

    if (current >= 2) return;

    setGuests({
      ...guests,
      [id]: {
        ...guests[id],
        adults: current + 1,
        children: guests[id]?.children ?? 0
      }
    });
  };

  const decreaseAdult = (id) => {
    const current = guests[id]?.adults ?? 1;

    if (current <= 1) return;

    setGuests({
      ...guests,
      [id]: {
        ...guests[id],
        adults: current - 1,
        children: guests[id]?.children ?? 0
      }
    });
  };

  /* ======================
     CHILD HANDLERS
  ====================== */

  const increaseChild = (id) => {
    const current = guests[id]?.children ?? 0;
    if (current >= 1) return;

    setGuests({
      ...guests,
      [id]: {
        adults: guests[id]?.adults ?? 2,
        children: current + 1
      }
    });
  };

  const decreaseChild = (id) => {
    const current = guests[id]?.children ?? 0;
    if (current <= 0) return;

    setGuests({
      ...guests,
      [id]: {
        adults: guests[id]?.adults ?? 2,
        children: current - 1
      }
    });
  };

  const increaseQty = (id) => {
    const current = quantities[id] || 1;

    setQuantities({
      ...quantities,
      [id]: current + 1
    });
  };

  const decreaseQty = (id) => {
    const current = quantities[id] || 1;

    if (current === 10) return;

    setQuantities({
      ...quantities,
      [id]: current - 1
    });
  };


  const handleAddToCart = (hotel) => {
  const quantity = quantities[hotel.id] || 1;
  const checkIn = dates[`in-${hotel.id}`];
  const checkOut = dates[`out-${hotel.id}`];

  const adults = guests[hotel.id]?.adults ?? 1;
  const children = guests[hotel.id]?.children ?? 0;

  const days = calculateDays(checkIn, checkOut);

  dispatch(
    addToCart({
      id: hotel.id,
      type: "hotel",
      title: hotel.title,
      price: hotel.price,
      image: hotel.image,
      description: hotel.description,
      quantity,
      checkIn,
      checkOut,
      adults,
      children,
      days,
      total: hotel.price * quantity * days,
    })
  );
};

  return (
    <section className={styles.section}>

      <h2>Hotels</h2>
      <p>Comfortable stays with beautiful views and relaxing surroundings.</p>

      <div className={styles.grid}>

        {rides.map((ride) => {

          const adults = guests[ride.id]?.adults ?? 1;
          const children = guests[ride.id]?.children ?? 0;

          return (
            <div key={ride.id} className={styles.card}>

              {/* IMAGE */}
              <div className={styles.imageWrapper}>
                <img src={ride.image} alt={ride.title} />

                <div className={styles.priceTag}>
                  <div className={styles.price}>₹{ride.price}/-</div>
                  <div className={styles.gst}>Including GST</div>
                </div>
              </div>

              {/* CONTENT */}
              <div className={styles.cardContent}>

                <h4>{ride.title}</h4>
                <p className={styles.description}>{ride.description}</p>

                {/* CHECK-IN */}
                <div className={styles.field}>
                  <label>Check-In :</label>

                  <div
                    className={styles.dateBox}
                    onClick={() => openCalendar(`in-${ride.id}`)}
                  >
                    <div className={styles.calendarCircle}>
                      <FaCalendarAlt />
                    </div>

                    <span className={styles.dateText}>
                      {formatDate(dates[`in-${ride.id}`])}
                    </span>

                    <FiChevronDown className={styles.arrow} />

                    <input
                      ref={(el) => (dateRefs.current[`in-${ride.id}`] = el)}
                      type="date"
                      className={styles.hiddenDate}
                      min={today}
                      value={dates[`in-${ride.id}`] || ""}
                      onChange={(e) =>
                        handleDateChange(`in-${ride.id}`, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* CHECK-OUT */}
                <div className={styles.field}>
                  <label>Check-Out :</label>

                  <div
                    className={styles.dateBox}
                    onClick={() => openCalendar(`out-${ride.id}`)}
                  >
                    <div className={styles.calendarCircle}>
                      <FaCalendarAlt />
                    </div>

                    <span className={styles.dateText}>
                      {formatNextDate(dates[`out-${ride.id}`])}
                    </span>

                    <FiChevronDown className={styles.arrow} />

                    <input
                      ref={(el) => (dateRefs.current[`out-${ride.id}`] = el)}
                      type="date"
                      className={styles.hiddenDate}
                      min={today}
                      value={dates[`out-${ride.id}`] || ""}
                      onChange={(e) =>
                        handleDateChange(`out-${ride.id}`, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* ADULT */}
                <div className={styles.priceRow}>
                  <span className={styles.dynamicPrice}>Adult:</span>

                  <div className={styles.quantityBox}>
                    <button
                      onClick={() => decreaseAdult(ride.id)}
                      className={styles.qtyBtn}
                      disabled={adults === 1}
                    >
                      −
                    </button>

                    <span className={styles.qtyNumber}>{adults}</span>

                    <button
                      onClick={() => increaseAdult(ride.id)}
                      className={styles.qtyBtn}
                      disabled={adults === 2}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CHILD */}
                <div className={styles.priceRow}>
                  <span className={styles.dynamicPrice}>Child:</span>

                  <div className={styles.quantityBox}>
                    <button
                      onClick={() => decreaseChild(ride.id)}
                      className={styles.qtyBtn}
                      disabled={children === 0}
                    >
                      −
                    </button>

                    <span className={styles.qtyNumber}>{children}</span>

                    <button
                      onClick={() => increaseChild(ride.id)}
                      className={styles.qtyBtn}
                      disabled={children === 1}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className={styles.addBtn}
                  onClick={() => handleAddToCart(ride)}
                >
                  Add To Cart
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hotels;