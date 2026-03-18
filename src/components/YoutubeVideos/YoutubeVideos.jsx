"use client";
import React, { useState } from "react";
import styles from "./YoutubeVideos.module.css";
import { FaPlay } from "react-icons/fa";

const YoutubeVideos = () => {
    const [mainPlaying, setMainPlaying] = useState(false);
    const [sidePlaying, setSidePlaying] = useState([false, false]);

    // YouTube video IDs
    const mainVideoId = "xWi8gshGmwU";
    const sideVideoIds = ["EryNG7LjSlQ", "SjMDO_wT2tU"];

    const handleMainPlay = () => setMainPlaying(true);

    const handleSidePlay = (index) => {
        const updated = [...sidePlaying];
        updated[index] = true;
        setSidePlaying(updated);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>See the Fun Come Alive</h2>
                <p>
                    Watch the excitement unfold through our video and get a glimpse of the thrilling rides, refreshing pools, and unforgettable moments waiting for you. Experience the energy, fun, and adventure that make every visit truly special.
                </p>
            </div>
            <section className={styles.videoSection}>
                {/* Main Video */}
                <div className={styles.mainVideo}>
                    {!mainPlaying ? (
                        <>
                            <img
                                className={styles.videoImage}
                                src={`https://img.youtube.com/vi/${mainVideoId}/hqdefault.jpg`}
                                alt="Main Video Thumbnail"
                            />
                            <div className={styles.overlay}>
                                <div className={styles.playButton} onClick={handleMainPlay}>
                                    <FaPlay size={24} /> {/* size can be adjusted */}
                                </div>
                                <div className={styles.textContent}>
                                    <h1>Aqua Marina Water Park</h1>
                                    <p>1hr away from Kolkata</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${mainVideoId}?autoplay=1&mute=1`}
                            title="Main Video"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className={styles.videoIframe}
                        />
                    )}
                </div>

                {/* Side Videos */}
                <div className={styles.sideVideos}>
                    {sideVideoIds.map((id, index) => (
                        <div className={styles.sideCard} key={index}>
                            {!sidePlaying[index] ? (
                                <>
                                    <img
                                        className={styles.videoImage}
                                        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                                        alt={`Side Video ${index + 1}`}
                                    />
                                    <div
                                        className={styles.smallPlay}
                                        onClick={() => handleSidePlay(index)}
                                    >
                                        <FaPlay size={16} color="white" /> {/* Adjust size/color as needed */}
                                    </div>
                                </>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1`}
                                    title={`Side Video ${index + 1}`}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className={styles.videoIframe}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default YoutubeVideos;