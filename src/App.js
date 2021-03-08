import './App.css';
import styles from './App.module.css';
import ScoringGuide from "./components/scoring-guide/scoring-guide";
import GameSetup from "./components/game-setup/game-setup";
import {useState, useEffect} from 'react';
import TotalScores from "./components/total-scores";
import CurrentRound from "./components/current-round";
import PreviousRounds from "./components/previous-rounds";
import {immutableUpdateByIndexWithFn} from "./lib/immutable-array";

const gameStates = {
    CONFIG: 'config',
    PLAYING: 'playing'
};

function App() {

    const [gameConfig, setGameConfig] = useState({});
    const [gameState, setGameState] = useState(gameStates.CONFIG);
    const [roundScores, setRoundScore] = useState([]);
    const [totalScores, setTotalScores] = useState([]);

    // DEBUG TEMP: Log game config on configuration set.
    useEffect(() => {
        console.log(gameConfig);
    }, [gameConfig])

    // Calculate total scores
    useEffect(() => {
        console.log(totalScores);
    }, [totalScores])

    function beginGame(config) {
        setGameConfig(config);
        setGameState(gameStates.PLAYING);
        setTotalScores(config.playerNames.map(_ => 0));
    }

    function handleRoundComplete(scores) {
        setRoundScore([...roundScores, scores]);

        console.log("SCORES");
        console.log(scores);

        const scoreReducer = (totalScores, score, i) =>
            immutableUpdateByIndexWithFn(totalScores, i,
                currentScore => currentScore + score);

        setTotalScores(scores.reduce(scoreReducer, totalScores));

        // scores.forEach((score, i) => setTotalScores(
        //     immutableUpdateByIndexWithFn(totalScores, i,
        //         currentScore => currentScore + score)
        //     )
        // )
    }

    return (
        <div className={styles.App}>
            <div className={styles.Content}>
                <div className={styles.Title}>Canasta Scoreboard</div>

                {gameState === gameStates.CONFIG &&
                <GameSetup onSubmit={beginGame}/>
                }

                {gameState === gameStates.PLAYING &&
                <div>
                    <TotalScores
                        playerNames={gameConfig.playerNames}
                        totalScores={totalScores}/>

                    <CurrentRound
                        playerNames={gameConfig.playerNames}
                        currentRoundNumber={roundScores.length + 1}
                        onRoundComplete={handleRoundComplete}/>

                    {roundScores.length > 0 &&
                    <PreviousRounds
                        players={gameConfig.playerNames}
                        roundScores={roundScores}
                    />
                    }
                </div>
                }

            </div>

            <ScoringGuide/>
        </div>
    );
}

export default App;
