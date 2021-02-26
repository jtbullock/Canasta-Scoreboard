import propTypes from 'prop-types';
import styles from './score-card.module.css';

export default function ScoreCard({title, scores}) {
    return (
        <div className={styles.scoreCard}>
            <div className={styles.scoreCardTitle}>{title}</div>

            <table className={styles.scoreTable}>
                <tbody>
                    {scores.map((b, i) => (
                        <tr key={b.name} className={i % 2 ? styles.oddRow : 'even'}>
                            <td className={styles.scoreName}>{b.name}</td>
                            <td className={styles.scorePoints}>{b.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ScoreCard.propTypes = {
    title: propTypes.string,
    scores: propTypes.array
}