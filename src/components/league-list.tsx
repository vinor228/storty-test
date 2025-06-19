import type { League } from '../types';
import { LeagueItem } from './league-item';
import BadgeDisplay from './badge-display';

interface LeagueListProps {
  leagues: League[];
  onLeagueClick: (leagueId: string, leagueName: string) => void;
  badgeUrl: string | null;
  leagueName: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  selectedLeagueId: string | null;
}

export default function LeagueList({
  leagues,
  onLeagueClick,
  badgeUrl,
  leagueName,
  isLoading,
  error,
  onClose,
  selectedLeagueId,
  }: LeagueListProps) {
  if (leagues.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#6B7280', padding: '2rem 0' }}>
        No leagues found matching your criteria.
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
      padding: '1rem',
    }}>
      {leagues.map((league) => (
        <div key={league.idLeague}>
          <LeagueItem
            league={league}
            onClick={() => onLeagueClick(league.idLeague, league.strLeague)}
          />

          {league.idLeague === selectedLeagueId && (
            <div style={{ paddingTop: '0.5rem' }}>
              <BadgeDisplay
                badgeUrl={badgeUrl}
                leagueName={leagueName}
                isLoading={isLoading}
                error={error}
                onClose={() => {
                  onClose();
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
