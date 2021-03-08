import {Card, CardBody, CardTitle} from "./card/card";
import propTypes from 'prop-types';

export default function TotalScores({playerNames, totalScores}) {
    return (
        <Card>
            <CardTitle>Player Scores</CardTitle>

            <CardBody>
                {playerNames.map((player, i) => <div key={i}>{player}: {totalScores[i]} / 5000</div>)}
            </CardBody>
        </Card>
    );
}

TotalScores.propTypes = {
  playerNames: propTypes.arrayOf(propTypes.string).isRequired
};