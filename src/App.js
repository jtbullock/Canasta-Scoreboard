import './App.css';
import styles from './App.module.css';
import ScoringGuide from "./components/scoring-guide";
import GameSetup from "./components/game-setup";
import {useState, useEffect} from 'react';

function App() {

    const [gameConfig, setGameConfig] = useState({});

    useEffect(() => {
        console.log(gameConfig);
    }, [gameConfig])

    return (
        <div className={styles.App}>

            <div className={styles.Content}>
                <GameSetup onSubmit={setGameConfig} />
            </div>

            <ScoringGuide/>
        </div>
    );
}

export default App;
