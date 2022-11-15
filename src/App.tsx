import { useState } from 'react'
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
            <div className='container'>
                <h1 className='fw-bold'> <img src='./assets/soccer-ball.png' className='ballImage mx-3'/>Football World Cup</h1>
                <h1 className='fw-bold fs-4'>Score Board</h1>
            </div>
            <div className='mt-3 mb-3 matchs'>
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
                    showResume &&
                    <ul>
                        {
                            [...matchs]
                            .sort((a: Match, b: Match) => (
                                ((b.homeScore || 0) + (b.awayScore || 0)) - ((a.homeScore || 0) + (a.awayScore || 0)) || moment(b.initGameDate).diff(moment()) - moment(a.initGameDate).diff(moment()))
                            ).map((match: Match, index: number) => (
                                <li key={index} data-testid='game-resume' className='col fs-2 text-center'>
                                    <span className='badge text-dark'>{match.homeTeam} <span className='text-secondary mx-2'>{match.homeScore}</span></span> 
                                    <span>-</span>
                                    <span className='badge text-dark'><span className='text-secondary mx-2'>{match.awayScore}</span> {match.awayTeam}</span>
                                </li>
                            ))
                        }
                    </ul>
                }
            </div>
            {
                !showResume && matchs.filter((match: Match) => match.gameIsFinish).length === matchs.length &&
                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button className='btn btn-dark text-white mt-5' onClick={() => setShowResume(true)} data-testid='resume-btn'>Resume</button>
                </div>
            }
        </div>
    );
}

export default App;
