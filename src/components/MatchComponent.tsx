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
      <div data-testid='game-result' className='col'>
        <span>{match.homeTeam} {match.homeScore}</span> 
        <span>-</span>
        <span>{match.awayScore} {match.awayTeam}</span>
      </div>

      <div className='col'>
        {!match.initGame && !match.gameIsFinish && <button className='btn btn-primary mx-2' onClick={() => onStartGame()}>Start game</button>}
        {match.initGame && <button className='btn btn-primary mx-2' onClick={() => onFinishGame()}>Finish game</button>}
        {match.initGame && !match.gameIsFinish && <button onClick={() => onUpdateScore()} className='btn btn-primary mx-2'>Update score</button>}
        {match.gameIsFinish && <span className='badge text-bg-danger'>Finished</span>}
      </div>
    </div>
  )
}

