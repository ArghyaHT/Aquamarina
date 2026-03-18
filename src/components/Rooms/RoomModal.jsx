"use client";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./RoomsModal.module.css";
import { useEffect } from "react";

export default function RoomModal({
    room,
    images,
    currentIndex,
    setCurrentIndex,
    onClose,
    onCheckAvailability,
}) {
    if (!room) return null;

     // Block scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden"; // disable background scroll
        return () => {
            document.body.style.overflow = ""; // restore scroll on unmount
        };
    }, []);

    const nextSlide = () => {
        if (!images || images.length === 0) return;
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (!images || images.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className={styles.close} onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Content */}
                <div className={styles.content}>
                    <h3>{room.title}</h3>
                    <p>{room.description}</p>
                </div>

                {/* Slider */}
                <div className={styles.sliderWrapper}>
                    <button className={styles.arrow} onClick={prevSlide}>
                        <FaChevronLeft />
                    </button>

                    <div className={styles.slider}>
                        <img
                            src={images?.[currentIndex] || "/room1.jpg"}
                            alt="room"
                            className={styles.sliderImage}
                        />
                    </div>

                    <button className={styles.arrow} onClick={nextSlide}>
                        <FaChevronRight />
                    </button>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    {images?.map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>

                <button className={styles.btn} onClick={onCheckAvailability}>
                    Check Availability
                </button>
            </div>
        </div>
    );
}