import styles from "./BasicConfirmButton.module.scss";

export default function BasicConfirmButton () {
    return (
        <div className={styles.basicConfirmBtn}>
            <button>Confirm</button>
        </div>
    )
}