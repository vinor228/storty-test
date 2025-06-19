'use client';

import {League} from "../types";

interface LeagueItemProps {
  league: League;
  onClick: () => void;
}

export function LeagueItem({
  league,
  onClick,
  }: LeagueItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1rem',
        margin: '1rem 0',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
        {league.strLeague}
      </h2>
      <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>Спорт: {league.strSport}</p>
      {league.strLeagueAlternate && (
        <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
          {league.strLeagueAlternate}
        </p>
      )}
    </div>
  );
}
