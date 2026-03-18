"use client"
import React, { useState } from 'react'
import styles from "./CheckoutForm.module.css";
import { useSelector } from "react-redux";
import moment from 'moment';

const CheckoutForm = () => {
    const cartItems = useSelector((state) => state.cart.items);

    console.log("Cart Items:", cartItems);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

     const subtotal = cartItems.reduce((sum, item) => {
  const spot = item.spotPrice || 0;
  const quantity = item.quantity || 1;

  // ✅ If hotel → include days
  const itemTotal =
    item.type === "hotel"
      ? item.price * quantity * (item.days || 1)
      : item.price * quantity;

  return sum + spot + itemTotal;
}, 0);

    // extract included tax (18%)
    const tax = Math.round((subtotal * 18) / 118);

    // total is same as subtotal (tax already included)
    const total = subtotal;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Checkout</h2>

            <div className={styles.wrapper}>
                {/* LEFT: Contact Info */}
                <div className={styles.card}>
                    <h3>Contact Information</h3>

                    <label>Full Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <label>Email Address*</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <label>Phone Number*</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* RIGHT: Order Summary */}
                <div className={styles.card}>
                    <h3>Order Summary</h3>
                    
                    {/* 🔥 Scrollable Area */}
                    <div className={styles.itemsList}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <img
                                    src={item.image || "/placeholder.png"}
                                    alt={item.title}
                                    className={styles.itemImage}
                                />

                                <div className={styles.itemDetails}>
                                    <p className={styles.title}>{item.title}</p>

                                    <span className={styles.date}>
                                        {item.type === "hotel"
                                            ? moment(item.checkIn).format("dddd, MMMM D, YYYY")
                                            : moment(item.date).format("dddd, MMMM D, YYYY")}
                                    </span>

                                    <span className={styles.qty}>
                                        {item.type === "hotel"
                                            ? `Quantity: ${item.quantity || 1}`
                                            : `Persons: ${item.quantity || 1}`}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coupon */}
                    <div className={styles.coupon}>
                        <input placeholder="Apply Coupon" />
                        <button>Apply</button>
                    </div>

                    {/* Pricing */}
                    <div className={styles.pricing}>
                        <div>
                            <span>Subtotal</span>
                            <span>₹{subtotal - tax}</span>
                        </div>
                        <div>
                            <span>Taxes & Fees (18%)</span>
                            <span>₹{tax}</span>
                        </div>
                        <div className={styles.total}>
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button className={styles.payBtn}>
                        Pay Online
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm