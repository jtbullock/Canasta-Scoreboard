import ScoreCard from "./score-card";

export default function ScoringGuide() {

    const bonuses = [
        {name: 'Canasta (w/wilds)', score: 300},
        {name: 'Natural (no wilds)', score: 500},
        {name: 'Red 3 (bonus card)', score: 100},
        {name: '4 - Red 3\'s', score: 800},
        {name: 'Going Out', score: 100},
        {name: 'Going Out "concealed"', score: 200}
    ];

    const cards = [
        {name: 'Jokers', score: 50},
        {name: 'Deuces', score: 20},
        {name: 'Aces', score: 20},
        {name: '8 thru K', score: 10},
        {name: '4 thru 7', score: 5},
        {name: 'Black 3', score: 5}
    ];

    const minimumMelds = [
        {name: 'Negative', score: 15},
        {name: '0 - 1495', score: 50},
        {name: '1500 - 2995', score: 90},
        {name: '3000+', score: 120}
    ]

    return (
        <div className="ml-4">
            <ScoreCard title="Bonuses" scores={bonuses}/>

            <ScoreCard title="Card" scores={cards} />

            <ScoreCard title="Minimum Meld" scores={minimumMelds} />
        </div>
    );
}