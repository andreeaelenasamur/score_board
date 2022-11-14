import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
// import App from '../src/App';
import { cleanup, fireEvent, render, renderHook, screen, within } from '@testing-library/react'
import { useState } from 'react';
import { Match } from '../src/interfaces/Match';
import { MatchComponent } from '../src/components/MatchComponent';

const defaultMatches: Match[] = [
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

describe('Test on App.tsx', () => {

    afterEach(cleanup);

    it("Should render with matchs", () => {
        render(<App />);

        const printedMatchs = screen.getAllByRole('match');

        expect(printedMatchs.length).toBe(defaultMatches.length);

        const resumeButton = screen.queryByText('Resume');
        expect(resumeButton).toBeFalsy();
    });

    it("When call to startGame, should set match score to 0-0", () => {
        render(<App />);

        const printedMatchs = screen.getAllByRole('match');

        const gameResult = within(printedMatchs[0]).getByTestId('game-result');

        expect(gameResult.textContent).toBe(`${defaultMatches[0].homeTeam} - ${defaultMatches[0].awayTeam}`);

        const startGameButton = within(printedMatchs[0]).getByText('Start game');
        const finishGameButton = within(printedMatchs[0]).queryByText('Finish game');
        const updateScoreButton = within(printedMatchs[0]).queryByText('Update score');

        expect(startGameButton).not.toBeNull();
        expect(finishGameButton).toBeNull();
        expect(updateScoreButton).toBeNull();

        fireEvent.click(startGameButton);

        expect(gameResult.textContent).toBe(`${defaultMatches[0].homeTeam} 0-0 ${defaultMatches[0].awayTeam}`);
    });

    it("When call to finishGame, should set gameIsFinish to true and remove from scoreboard", () => {
        defaultMatches[0].initGame = true;
        defaultMatches[0].initGameDate = new Date();
        defaultMatches[0].homeScore = 0;
        defaultMatches[0].awayScore = 0;

        render(<App />);

        let printedMatchs = screen.getAllByRole('match');

        const gameResult = within(printedMatchs[0]).getByTestId('game-result');

        expect(gameResult.textContent).toBe(`${defaultMatches[0].homeTeam} 0-0 ${defaultMatches[0].awayTeam}`);

        const startGameButton = within(printedMatchs[0]).queryByText('Start game');
        const finishGameButton = within(printedMatchs[0]).getByText('Finish game');
        const updateScoreButton = within(printedMatchs[0]).getByText('Update score');
        
        expect(startGameButton).toBeNull();
        expect(finishGameButton).not.toBeNull();
        expect(updateScoreButton).not.toBeNull();

        fireEvent.click(finishGameButton);

        printedMatchs = screen.getAllByRole('match');
        
        expect(printedMatchs.length).not.toBe(defaultMatches.length);

    });
    
});