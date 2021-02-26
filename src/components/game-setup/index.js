import {useEffect, useState} from "react";
import {immutablePop, immutablePush, immutableUpdateByIndex} from "../../lib/immutable-array";

export default function GameSetup({onSubmit}) {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(['', '']);
    const [playingAs, setPlayingAs] = useState('Teams');

    useEffect(() => {
        if (playerNames.length > numberOfPlayers) {
            setPlayerNames(immutablePop(playerNames)[1]);
        } else if (playerNames.length < numberOfPlayers) {
            setPlayerNames(immutablePush(playerNames, ''));
        }
    }, [numberOfPlayers]);

    function updatePlayerName(index, newName) {
        setPlayerNames(immutableUpdateByIndex(playerNames, index, newName));
    }

    function buildConfigAndSubmit() {
        const config = {
            numberOfPlayers,
            playerNames,
            playingAs
        };

        onSubmit(config);
    }

    return (
        <div>
            <h1>Canasta Scoreboard</h1>

            <div>
                <label>Playing as:</label>
                <select onChange={e => setPlayingAs(e.target.value)}>
                    <option>Teams</option>
                    <option>Players</option>
                </select>
            </div>

            <div>
                <label>
                    Number of {playingAs}:
                    <select onChange={e => setNumberOfPlayers(e.target.value)}>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </label>
            </div>

            <div>
                <label>{playingAs} names:</label>
                {playerNames.map((p, i) => (
                    <div key={i}>
                        <label>{playingAs} {i}:
                            <input type="text" onChange={e => updatePlayerName(i, e.target.value)}/>
                        </label>
                    </div>
                ))}
            </div>

            <button onClick={buildConfigAndSubmit}>Start!</button>
        </div>
    );
}