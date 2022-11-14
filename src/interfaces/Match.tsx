export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    initGame: boolean;
    initGameDate: Date | null;
    gameIsFinish: boolean;
}