import styles from "./HeaderAccount.module.scss";
import Container from "../basic/container/Container";
import Link from "next/link";
import LinearLogo from "../../../public/assets/svg/LinearLogoHome";
import HomeIcon from "../../../public/assets/svg/HomeIcon";
import Video from "../../../public/assets/svg/Video";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";
import AccountHeadImage from "../../../public/assets/png/accountHeadImage.png"
import Image from "next/image";
import { JSX } from "react";
import HamburgerAccount from "../hamburgerAccount/HamburgerAccount"
export const LinksHead: {href: string, icon: JSX.Element, text: string}[] = [
    {
        href: "/notifications",
        icon: <NotificationIcon />,
        text: "Notifications",
    },
    {
        href: "/account",
        icon: <MessagesIcon />,
        text: "Messages",
    },
    {
        href: "/account",
        icon: <SettingsIcon />,
        text: "Settings",
    },
]
export const iconsWithBackground: JSX.Element[] = [
    <HomeIcon/>, <Video />
]
export default function HeaderAccount () {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.contentHeader}>
                    <div className={styles.leftHeader}>
                        <div className={styles.logo}>
                            <Link href="/account"><LinearLogo /></Link>
                        </div>
                        <div className={styles.secondBlockLeftHeader}>
                            <input type="search" placeholder="Start typing to search.."/>
                            <div className={styles.icons}>
                                {iconsWithBackground.map((item: any, index:number) => {
                                    return <div key={index} className={styles.backgroundIcon}>
                                        {item}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightHeader}>
                        {LinksHead.map ((item: any, index: number) => {
                            return <Link href={item.href} key={index}>{item.icon}</Link>
                        })}
                        <Link href="/account">
                            <Image 
                                src={AccountHeadImage.src}
                                alt="accountImage"
                                width={28}
                                height={28}
                            />
                        </Link>
                        
                    </div>
                    <div className={styles.hamburgerMenu}>
                        <HamburgerAccount />
                    </div>

                </div>
            </Container>
        </header>
    )
}