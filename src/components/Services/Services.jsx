"use client";

import React from "react";
import styles from "./Services.module.css";
import Link from "next/link";

import {
  HiTicket,
  HiUsers,
  HiBuildingOffice,
  HiMap,
  HiTag,
  HiShoppingBag,
} from "react-icons/hi2";

const services = [
  { icon: HiTicket, title: "Park Tickets", tab: "passes" },
  { icon: HiUsers, title: "Group Tickets", tab: "passes" },
  { icon: HiBuildingOffice, title: "Hotel", tab: "hotels" },
  { icon: HiMap, title: "Picnic Spot", tab: "picnic" },
  { icon: HiTag, title: "Deals & Specials", tab: "passes" },
  { icon: HiShoppingBag, title: "Foods", tab: "passes" },
];

const Services = () => {
  return (
    <section className={styles.servicesSection}>
        <div className={styles.servicesBox}>

          {services.map(({ icon: Icon, title, tab }, index) => (
            
            <Link
              key={index}
              href={`/booking?tab=${tab}`}
              className={styles.serviceItem}
            >
              <Icon className={styles.icon} />
              <span>{title}</span>
            </Link>

          ))}

        </div>
    </section>
  );
};

export default Services;