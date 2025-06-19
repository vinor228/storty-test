'use client';

import { Search } from 'lucide-react';

interface LeagueFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSport: string;
  onSportChange: (sport: string) => void;
  sportOptions: string[];
}

export default function LeagueFilters({
                                        searchTerm,
                                        onSearchChange,
                                        selectedSport,
                                        onSportChange,
                                        sportOptions,
                                      }: LeagueFiltersProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <Search
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '1rem',
            width: '1rem',
            color: '#9CA3AF',
          }}
        />
        <input
          placeholder="Search leagues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem 0.5rem 2.25rem',
            borderRadius: '0.375rem',
            border: '1px solid #D1D5DB',
            fontSize: '1rem',
          }}
        />
      </div>

      <div style={{ width: '100%', maxWidth: '16rem' }}>
        <select
          value={selectedSport}
          onChange={(e) => onSportChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #D1D5DB',
            fontSize: '1rem',
          }}
        >
          <option value="">All Sports</option>
          {sportOptions.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
