import {useState, useEffect} from "react";
import {immutablePop, immutablePush, immutableUpdateByIndexWithObject} from "../../lib/immutable-array";
import styles from './game-setup.module.css';
import classNames from 'classnames';

export default function GameSetup({onSubmit}) {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(['', '']);
    const [playingAs, setPlayingAs] = useState('Teams');

    // Sync player names with number of players.
    useEffect(() => {
        if (playerNames.length > numberOfPlayers) {
            setPlayerNames(immutablePop(playerNames)[1]);
        } else if (playerNames.length < numberOfPlayers) {
            setPlayerNames(immutablePush(playerNames, ''));
        }
    }, [numberOfPlayers, playerNames]);

    // Set number of players to two if playing as teams.
    useEffect(() => {
        if(playingAs === 'Teams')
        {
            setNumberOfPlayers(2);
        }
    }, [playingAs]);

    function updatePlayerName(index, newName) {
        setPlayerNames(immutableUpdateByIndexWithObject(playerNames, index, newName));
    }

    function buildConfigAndSubmit() {
        const config = {
            numberOfPlayers,
            playerNames,
            playingAs
        };

        onSubmit(config);
    }

    function getPlayingAsLabel() {
        return playingAs.slice(0, -1);
    }

    return (
        <div className={styles.gameSetup}>
            <div className={styles.gameSetupTitle}>Game Setup</div>

            <div style={{marginBottom: '.75em'}}>
                <span>Will you be playing as individual players or teams?</span>
                <div className="pillSelector">
                    <span className={classNames('pill', {'selected': playingAs === 'Teams'})}
                          onClick={() => setPlayingAs('Teams')}>
                        Teams
                    </span>
                    <span className={classNames('pill', {'selected': playingAs === 'Players'})}
                          onClick={() => setPlayingAs('Players')}>
                        Players
                    </span>
                </div>
            </div>

            {playingAs === 'Players' &&
                <div style={{marginBottom: '.75em'}}>
                    <span>How many players are there?</span>
                    <div className="pillSelector">
                        <span className={classNames('pill', {'selected': numberOfPlayers === 2})}
                              onClick={() => setNumberOfPlayers(2)}>
                            2
                        </span>
                            <span className={classNames('pill', {'selected': numberOfPlayers === 3})}
                                  onClick={() => setNumberOfPlayers(3)}>
                            3
                        </span>
                    </div>
                </div>
            }

            <div style={{marginBottom: '.75em'}}>
                {playerNames.map((p, i) => (
                    <div key={i} style={{display:'inline-block', marginRight: '1em'}}>
                        <div style={{marginBottom: '0.25em'}}>
                            {getPlayingAsLabel()} {i+1}'s name
                        </div>
                        <input type="text" onChange={e => updatePlayerName(i, e.target.value)}/>
                    </div>
                ))}
            </div>

            <button type="button" className="primary"
                    style={{width:80}}
                    onClick={buildConfigAndSubmit}>Start!</button>
        </div>
    );
}