import styles from './previous-rounds.module.css';
import ScoreCell from "./score-cell";
import propTypes from 'prop-types';
import {Card, CardBody, CardTitle} from "./card/card";

export default function PreviousRounds({players, roundScores}) {
    return (
        <Card>
            <CardTitle>Previous Rounds</CardTitle>
            <CardBody>
                <div className={styles.PreviousRounds}>

                    <div>
                        <ScoreCell>&nbsp;</ScoreCell>

                        {roundScores.map((_, i) => <ScoreCell key={i}>Round {i+1}</ScoreCell>)}
                    </div>

                    {players.map((player, playerIndex) => (
                        <div key={playerIndex}>
                            <ScoreCell>{player}</ScoreCell>

                            {roundScores.map((scores, scoreIndex) =>
                                <ScoreCell key={scoreIndex}>{scores[playerIndex]}</ScoreCell>)}
                        </div>
                    ))}

                </div>
            </CardBody>
        </Card>
    )
}

PreviousRounds.propTypes = {
    players: propTypes.arrayOf(propTypes.string).isRequired,
    roundScores: propTypes.array.isRequired
};