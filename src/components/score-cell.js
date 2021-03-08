import styles from './score-cell.module.css';

export default function ScoreCell({children}) {
    return <div className={styles.ScoreCell}>{children}</div>;
}
