import React from "react";
import styles from "./Rides.module.css";

const rides = [
  {
    image: "/52degree.jpg",
    title: "52’ Family Slide",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
  {
    image: "/kidsplay.jpg",
    title: "Kids Play Station",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
  {
    image: "/multiracer.jpg",
    title: "Multi Racer",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
  {
    image: "/superloop.jpg",
    title: "Super Loop",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
  {
    image: "/familyarena.jpg",
    title: "Rain Dance",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
  {
    image: "/picnicarena.jpg",
    title: "Aqua Marina",
    desc: "Grab your family and slide down together on this exciting ride built for shared thrills and laughter.",
  },
];

const Rides = () => {
  return (
    <section className={styles.ridesSection}>
      <div className="container">

        <div className={styles.header}>
          <h2>Twists. Turns. Total Fun.</h2>
          <p>
            Get ready for an exciting ride filled with thrilling twists and fast
            turns that keep the fun going from start to finish. Feel the rush as
            you slide through every curve and splash into refreshing water at
            the end.
          </p>
        </div>

        <div className={styles.ridesGrid}>
          {rides.map((ride, index) => (
            <div key={index} className={styles.cardWrapper}>
              
              <div className={styles.card}>
                <img src={ride.image} alt={ride.title} />

                <div className={styles.cardContent}>
                  <h3>{ride.title}</h3>
                  <p>{ride.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Rides;