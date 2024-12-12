import NotificationsBlock from "../notificationsBlock/NotificationsBlock"
import styles from "./BottomNotifications.module.scss"
import RightAccount from "../basic/rightAccount/RightAccount"
export default function BottomNotifications () {
    return (
        <div className={styles.bottomContent}>
            <NotificationsBlock />
            <RightAccount />
        </div>
    )
}