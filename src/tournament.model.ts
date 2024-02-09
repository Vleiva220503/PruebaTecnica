export interface AddUserToTournamentResult {
  status: AddUserToTournamentStatus;
  balance?: number;
  message: string;
}

export enum AddUserToTournamentStatus {
  Fail = 0,
  Success,
  NotEnoughBalance,
  TournamentUnavailable,
}

export function getAddUserToTournamentResult(
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

export interface Tournament {
  id: string;
  accessPrice: number;
  rewardsByRanking: { [position: number]: number };
  status: 'Pending' | 'Running' | 'Finished';
}

export interface AddUserToTournamentResult {
  status: AddUserToTournamentStatus;
  balance?: number;
  message: string;
}

/*export enum AddUserToTournamentStatus {
    Fail = 0,
    Success,
    NotEnoughBalance,
    TournamentUnavailable,
  }*/
