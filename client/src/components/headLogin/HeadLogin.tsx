"use client";
import styles from "./HeadLogin.module.scss";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import Container from "../basic/container/Container";
import Link from "next/link";
export default function HeadLogin({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  return (
    <Container>
      <div className={styles.parentDiv}>
        <div className={styles.contentHeadLogin}>
          <div className={styles.logo}>
            <Link href="/">
              <LinearLogo />
            </Link>
          </div>
          <div className={styles.btnsHead}>
            <button className={styles.activeButton} onClick={() => setIsLogin(true)}>
              Log In
            </button>
            <button onClick={() => setIsLogin(false)}>Register</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
