import styles from "./AuthSliderSection.module.scss";
import Container from "../basic/container/Container";
import { slidesData } from "../slidesData/SlidesData";
import AuthSliderComponent from "../authSlider/AuthSlider";
// import PinkAuthor from "../../../public/assets/png/pinkAuthor.png";
// import RedAuthor from "../../../public/assets/png/redAuthor.png";
// import PurpleAuthor from "../../../public/assets/png/purpleAuthor.png";
// import YellowAuthor from "../../../public/assets/png/yellowAuthor.png";
import Image from "next/image";
export default function AuthSliderSection() { 
  return (
    <div className={styles.authSlider}>
      <Container>
        <div className={styles.contentAuthSlider}>
          <div className={styles.titleAuthSlider}>
            <h2>What Our Happy Customers Say About Us</h2>
          </div>
          <div className={styles.authors}>
              <AuthSliderComponent slides={slidesData}/> 
          </div>
        </div>
      </Container>
    </div>
  );
}
