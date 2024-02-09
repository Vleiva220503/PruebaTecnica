// tournament.service.ts
  import { Injectable } from '@nestjs/common';
  import { Tournament, AddUserToTournamentResult, AddUserToTournamentStatus } from './tournament.model';
  
  @Injectable()
  export class TournamentService {
    private tournaments: Map<string, Tournament> = new Map();
  
    async createTournament(
      tournamentId: string,
      accessPrice: number,
      rewardsByRanking: { [position: number]: number },
    ): Promise<boolean> {
      const newTournament: Tournament = {
        id: tournamentId,
        accessPrice,
        rewardsByRanking,
        status: 'Pending',
      };
  
      this.tournaments.set(tournamentId, newTournament);
  
      return true;
    }
  
    async addUserToTournament(mail: string, tournamentId: string): Promise<AddUserToTournamentResult> {
      const tournament = this.tournaments.get(tournamentId);
  
      if (!tournament || tournament.status !== 'Pending') {
        return this.getAddUserToTournamentResult(AddUserToTournamentStatus.TournamentUnavailable);
      }
      const newBalance = 100; 
      return this.getAddUserToTournamentResult(AddUserToTournamentStatus.Success, newBalance);
    }
  
    async startTournament(tournamentId: string): Promise<boolean> {
      const tournament = this.tournaments.get(tournamentId);
  
      if (tournament) {
        tournament.status = 'Running';
        return true;
      }
  
      return false;
    }
  
    private getAddUserToTournamentResult(
      status: AddUserToTournamentStatus,
      balance?: number,
    ): AddUserToTournamentResult {
      let message = '';
  
      switch (status) {
        case AddUserToTournamentStatus.Fail:
          message = 'Failed to add user to the tournament.';
          break;
        case AddUserToTournamentStatus.Success:
          message = 'User successfully added to the tournament.';
          break;
        case AddUserToTournamentStatus.NotEnoughBalance:
          message = 'User does not have enough balance to enter the tournament.';
          break;
        case AddUserToTournamentStatus.TournamentUnavailable:
          message = 'The tournament is not available for entry.';
          break;
        default:
          message = 'Unknown status.';
      }
  
      return { status, balance, message };
    }
  }
  