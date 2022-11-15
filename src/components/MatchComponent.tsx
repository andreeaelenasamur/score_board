import React from 'react'
import { Match } from '../interfaces/Match';

type Props = {
  match: Match;
  onStartGame: () => void;
  onFinishGame: () => void;
  onUpdateScore: () => void;
}

export const MatchComponent: React.FC<Props> = ({match, onStartGame, onFinishGame, onUpdateScore}) => {  
  return (
    <div role='match' className='d-flex my-3'>
      <div data-testid='game-result' className='col fs-3 text-center mx-2'>
        <span className='badge text-dark'>{match.homeTeam} <span className='text-secondary mx-2'>{match.homeScore}</span></span> 
        <span>-</span>
        <span className='badge text-dark'><span className='text-secondary mx-2'>{match.awayScore}</span> {match.awayTeam}</span>
      </div>

      <div className='col text-end mx-5'>
        {!match.initGame && !match.gameIsFinish && <button className='btn btn-primary mx-2' onClick={() => onStartGame()}>Start game</button>}
        {match.initGame && <button className='btn btn-warning mx-2' onClick={() => onFinishGame()}>Finish game</button>}
        {match.initGame && !match.gameIsFinish && <button onClick={() => onUpdateScore()} className='btn btn-info mx-2'>Update score</button>}
        {match.gameIsFinish && <span className='btn btn-danger disabled text-white mx-2'>Finished</span>}
      </div>
    </div>
  )
}

