import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Match } from './interfaces/Match';
import { MatchComponent } from './components/MatchComponent';

export const defaultMatches: Match[] = [
    {
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: null,
        awayScore: null,
        initGame: false,
        initGameDate: null,
        gameIsFinish: false
    },
    {
        homeTeam: 'Spain',
        awayTeam: 'Brazil',
        homeScore: null,
        awayScore: null,
        initGame: false,
        initGameDate: null,
        gameIsFinish: false
    },
    {
        homeTeam: 'Germany',
        awayTeam: 'France',
        homeScore: null,
        awayScore: null,
        initGame: false,
        initGameDate: null,
        gameIsFinish: false
    },
    {
        homeTeam: 'Uruguay',
        awayTeam: 'Italy',
        homeScore: null,
        awayScore: null,
        initGame: false,
        initGameDate: null,
        gameIsFinish: false
    },
    {
        homeTeam: 'Argentina',
        awayTeam: 'Australia',
        homeScore: null,
        awayScore: null,
        initGame: false,
        initGameDate: null,
        gameIsFinish: false
    }
];

const App = (): JSX.Element => {

    const [matchs, setMatchs] = useState<Match[]>(defaultMatches);

    const startGame = (index: number) => {
        const matchToBeModified: Match = {
            ...matchs[index],
            initGame: true,
            initGameDate: new Date(),
            awayScore: 0,
            homeScore: 0,
        };

        setMatchs(matchs.map((match: Match, arrayIndex: number) => index === arrayIndex ? matchToBeModified : match));
    };

    const finishGame = (index: number) => {
        const matchToBeModified: Match = {
            ...matchs[index],
            gameIsFinish: true
        };

        setMatchs(matchs.map((match: Match, arrayIndex: number) => index === arrayIndex ? matchToBeModified : match));
    };

    const updateScore = (index: number) => {

    };


    return (
        <div>
            {matchs.filter((match: Match) => !match.gameIsFinish).map((match: Match, index: number) => (
                <MatchComponent
                    key={index}
                    match={match}
                    onStartGame={() => startGame(index)}
                    onFinishGame={() => finishGame(index)}
                    onUpdateScore={() => updateScore(index)}
                ></MatchComponent>
            ))}

            {matchs.filter((match: Match) => match.gameIsFinish).length === matchs.length && <button>Resume</button> }
        </div>
    );
}

export default App;
