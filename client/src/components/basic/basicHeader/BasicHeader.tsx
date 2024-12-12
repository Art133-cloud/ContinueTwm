import styles from "./BasicHeader.module.scss";
import NotificationOrangeIcon from "../../../../public/assets/svg/NotificationOrangeIcon";
import MessagesOrange from "../../../../public/assets/svg/MessagesOrange";
import SettingsOrange from "../../../../public/assets/svg/SettingsOrange";
import AccountHeadImage from "../../../../public/assets/png/accountHeadImage.png"
import HomeIcon from "../../../../public/assets/svg/HomeIcon";
import Video from "../../../../public/assets/svg/Video";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/svg/Logo"
import { JSX } from "react";
import Container from "../container/Container";
export default function BasicHeader () {
    const LinksHead: {href: string, icon: JSX.Element}[] = [
        {
            href: "/notifications",
            icon: <NotificationOrangeIcon />
        },
        {
            href: "/notifications",
            icon: <MessagesOrange />
        },
        {
            href: "/notifications",
            icon: <SettingsOrange />
        },
    ]
    const iconsWithBackground: JSX.Element[] = [
        <HomeIcon/>, <Video />
    ]
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.contentHeader}>
                    <div className={styles.leftHeader}>
                        <div className={styles.logo}>
                            <Link href="/"><Logo fill = "#ff715b" fillText="#000"/></Link>
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
                </div>
                </Container>
        </header>
    )
}