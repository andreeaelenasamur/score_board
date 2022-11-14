import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Match } from './interfaces/Match';
import { MatchComponent } from './components/MatchComponent';
import moment from 'moment';

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

    const [showResume, setShowResume] = useState<boolean>(false);

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
            initGame: false,
            gameIsFinish: true
        };

        setMatchs(matchs.map((match: Match, arrayIndex: number) => index === arrayIndex ? matchToBeModified : match));
    };

    const updateScore = (index: number) => {

        const randomTeam = Math.floor(Math.random() * 2);

        const matchToBeUpdated: Match = {
            ...matchs[index],
            homeScore: randomTeam <= 0 ? (matchs[index].homeScore || 0) + 1 : (matchs[index].homeScore || 0),
            awayScore: randomTeam > 0 ? (matchs[index].awayScore || 0) + 1 : (matchs[index].awayScore || 0),
        }

        setMatchs(matchs.map((match: Match, arrayIndex: number) => index === arrayIndex ? matchToBeUpdated : match));
    };


    return (
        <div>
            {!showResume && matchs.map((match: Match, index: number) => (
                <MatchComponent
                    key={index}
                    match={match}
                    onStartGame={() => startGame(index)}
                    onFinishGame={() => finishGame(index)}
                    onUpdateScore={() => updateScore(index)}
                ></MatchComponent>
            ))}

            {
                !showResume && matchs.filter((match: Match) => match.gameIsFinish).length === matchs.length &&
                <button className='btn btn-info' onClick={() => setShowResume(true)} data-testid='resume-btn'>Resume</button>
            }

            {
                showResume &&
                <ul>
                    {
                        [...matchs]
                        .sort((a: Match, b: Match) => (
                            ((b.homeScore || 0) + (b.awayScore || 0)) - ((a.homeScore || 0) + (a.awayScore || 0)) || moment(b.initGameDate).diff(moment()) - moment(a.initGameDate).diff(moment()))
                        ).map((match: Match, index: number) => (
                            <li key={index} data-testid='game-resume'>
                                <span>{match.homeTeam} {match.homeScore}</span> 
                                <span>-</span>
                                <span>{match.awayScore} {match.awayTeam}</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    );
}

export default App;
