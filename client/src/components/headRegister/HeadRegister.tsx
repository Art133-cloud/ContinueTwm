"use client";
import styles from "./HeadRegister.module.scss";
import Container from "../basic/container/Container";
import Link from "next/link";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
export default function HeadRegister({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
    return (
      <Container>
        <div className={styles.contentHeadRegister}>
          <div className={styles.logo}>
            <Link href="/">
                <LinearLogo />
            </Link>
          </div>
          <div className={styles.btnsHead}>
            <button onClick={() => setIsLogin(true)}>Log In</button>
            <button className={styles.activeButton} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>
        </div>
      </Container>
    );
  }