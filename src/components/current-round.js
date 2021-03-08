import {useState, useEffect, useRef} from 'react';
import {Card, CardBody, CardTitle} from "./card/card";
import propTypes from 'prop-types';
import styles from './current-round.module.css';
import {immutableUpdateByIndexWithFn} from "../lib/immutable-array";
import ScoreCell from "./score-cell";

export default function CurrentRound({playerNames, currentRoundNumber, onRoundComplete}) {
    const [scores, setScores] = useState(getInitialScores());
    const roundNumber = useRef(currentRoundNumber);

    function getInitialScores() {
        const createPlayerScore = () => {
            return {
                bonus: 0,
                cardPoints: 0
            };
        }

        return playerNames.map(() => createPlayerScore());
    }

    const setScore = (playerIndex, category, newBonus) => {
        setScores(
            immutableUpdateByIndexWithFn(scores, playerIndex,
                s => ({...s, [category]: newBonus}))
        );
    }

    // Reset scores on new round
    useEffect(() => {
        if(currentRoundNumber !== roundNumber.current)
        {
            setScores(getInitialScores());
            roundNumber.current = currentRoundNumber;
        }
    }, [currentRoundNumber])

    return (
        <Card>
            <CardTitle>Round {currentRoundNumber}</CardTitle>

            <CardBody>
                <div className={styles.ScoreColumns}>
                    <div>
                        <ScoreCell>&nbsp;</ScoreCell>
                        <ScoreCell>Bonus</ScoreCell>
                        <ScoreCell>Card Points</ScoreCell>
                        <ScoreCell>Total</ScoreCell>
                    </div>

                    {playerNames.map((player, i) => {

                        const playerScore = scores[i];

                        return (
                            <div key={i}>
                                <ScoreCell>{player}</ScoreCell>
                                <ScoreCell>
                                    <input type="number" value={playerScore.bonus}
                                           onChange={(e) =>
                                               setScore(i, 'bonus', +e.target.value)}/>
                                </ScoreCell>
                                <ScoreCell>
                                    <input type="number" value={playerScore.cardPoints}
                                           onChange={(e) =>
                                               setScore(i, 'cardPoints', +e.target.value)}/>
                                </ScoreCell>
                                <ScoreCell>
                                    <div className={styles.TotalCell}>
                                        {playerScore.bonus + playerScore.cardPoints}
                                    </div>
                                </ScoreCell>
                            </div>
                        );
                    })}
                </div>

                <button type="button" className="primary"
                        onClick={() => onRoundComplete(scores.map(score => score.bonus + score.cardPoints))}>
                    Complete Round
                </button>
            </CardBody>
        </Card>
    );
}

CurrentRound.propTypes = {
    playerNames: propTypes.arrayOf(propTypes.string).isRequired,
    currentRoundNumber: propTypes.number.isRequired,
    onRoundComplete: propTypes.func.isRequired
};