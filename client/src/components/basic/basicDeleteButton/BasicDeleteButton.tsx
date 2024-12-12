import styles from "./BasicDeleteButton.module.scss"
export default function BasicDeleteButton () {
    return (
        <div className={styles.basicDeleteButton}>
            <button>Delete</button>
        </div>
    )
}