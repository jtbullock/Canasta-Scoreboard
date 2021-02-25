import propTypes from 'prop-types';

export default function ScoreCard({title, scores}) {
    return (
        <div>
            <h3>{title}</h3>

            <table>
                {scores.map(b => (
                    <tr>
                        <td>{b.name}</td>
                        <td>{b.score}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

ScoreCard.propTypes = {
    title: propTypes.string,
    scores: propTypes.array
}