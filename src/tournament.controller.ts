import { Controller, Post, Body, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { AddUserToTournamentResult } from './tournament.model';


@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post(':id/create')
  async createTournament(
    @Param('id') tournamentId: string,
    @Body() body: { accessPrice: number; rewardsByRanking: { [position: number]: number } },
  ): Promise<boolean> {
    return this.tournamentService.createTournament(tournamentId, body.accessPrice, body.rewardsByRanking);
  }

  @Post(':id/adduser')
  async addUserToTournament(
    @Param('id') tournamentId: string,
    @Body() body: { mail: string },
  ): Promise<AddUserToTournamentResult> {
    return this.tournamentService.addUserToTournament(body.mail, tournamentId);
  }

  @Post(':id/start')
  async startTournament(@Param('id') tournamentId: string): Promise<boolean> {
    return this.tournamentService.startTournament(tournamentId);
  }
}