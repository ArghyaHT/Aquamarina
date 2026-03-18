import Image from "next/image";
import styles from "./LandingImage.module.css";

const LandingImage = () => {
  return (
    <div className={styles.container}>
      <img
        src="/landing.png"
        alt="Landing"
        className={styles.image}
      />
    </div>
  );
};

export default LandingImage;