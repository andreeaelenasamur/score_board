import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App, { defaultMatches } from '../src/App';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { Match } from '../src/interfaces/Match';
import moment from 'moment';

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
        
        expect(printedMatchs.length).toBe(defaultMatches.length);

    });

    it("When call to updateScore, should change and update match score", () => {
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

        fireEvent.click(updateScoreButton);

        printedMatchs = screen.getAllByRole('match');
        
        expect(printedMatchs.length).toBe(defaultMatches.length);
        expect(printedMatchs[0].textContent?.includes('1')).toBeTruthy();
    });

    describe('Resume button', () => {

        let resumeButton;

        beforeEach(() => {
            defaultMatches.forEach((match: Match, index: number) => {
                match.gameIsFinish = true;
                match.initGameDate = moment().subtract(defaultMatches.length - index, 'hours').toDate();
                match.homeScore = index + 3;
                match.awayScore = index + 3;
            });

            render(<App />);

            resumeButton = screen.getByTestId('resume-btn');
        });

        it("When all matches are finished, button resume appears", () => {
            expect(resumeButton).toBeTruthy();
        });

        it("When resumes appears, first match should be match with higher score and the most recent", () => {
            fireEvent.click(resumeButton);

            const resumes = screen.getAllByTestId('game-resume');

            expect(resumes.length).toBe(defaultMatches.length);

            expect(resumes[0].textContent?.includes(defaultMatches[defaultMatches.length - 1].homeTeam)).toBeTruthy();
            expect(resumes[0].textContent?.includes((defaultMatches[defaultMatches.length - 1].homeScore || 0).toString())).toBeTruthy();
            expect(resumes[0].textContent?.includes(defaultMatches[defaultMatches.length - 1].awayTeam)).toBeTruthy();
            expect(resumes[0].textContent?.includes((defaultMatches[defaultMatches.length - 1].awayScore || 0).toString())).toBeTruthy();
        });
    });
    
});