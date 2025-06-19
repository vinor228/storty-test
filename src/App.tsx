'use client'
import './index.css'
import { useState, useEffect } from 'react';
import type { League, LeaguesResponse, SeasonsResponse } from './types';
import LeagueList from './components/league-list';
import LeagueFilters from "./components/league-filtees";

export default function HomePage() {
  const [allLeagues, setAllLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [sportOptions, setSportOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const [selectedLeagueName, setSelectedLeagueName] = useState<string | null>(null);
  const [badgeLoading, setBadgeLoading] = useState(false);
  const [badgeError, setBadgeError] = useState<string | null>(null);
  const [badgeCache, setBadgeCache] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchLeagues = async () => {
      const cached = localStorage.getItem('leagues');
      if (cached) {
        const parsed = JSON.parse(cached);
        setAllLeagues(parsed);
        setFilteredLeagues(parsed);
        const sports = Array.from(new Set(parsed.map((l: League) => l.strSport))).sort();
        setSportOptions(sports as string[]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php');
        const data: LeaguesResponse = await response.json();
        if (data.leagues) {
          setAllLeagues(data.leagues);
          setFilteredLeagues(data.leagues);
          localStorage.setItem('leagues', JSON.stringify(data.leagues));
          const sports = Array.from(new Set(data.leagues.map((l) => l.strSport))).sort();
          setSportOptions(sports);
        }
      } catch (err) {
        setError('Failed to fetch leagues');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    let filtered = allLeagues;

    if (searchTerm) {
      filtered = filtered.filter(league =>
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSport) {
      filtered = filtered.filter(league => league.strSport === selectedSport);
    }

    setFilteredLeagues(filtered);
  }, [allLeagues, searchTerm, selectedSport]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const handleLeagueClick = async (leagueId: string, leagueName: string) => {
    if (badgeCache.has(leagueId)) {
      setBadgeUrl(badgeCache.get(leagueId) || null);
      setSelectedLeagueName(leagueName);
      return;
    }

    try {
      setBadgeLoading(true);
      setBadgeError(null);
      setSelectedLeagueName(leagueName);

      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch badge: ${response.status}`);
      }

      const data: SeasonsResponse = await response.json();

      if (data.seasons && data.seasons.length > 0 && data.seasons[0].strBadge) {
        const badgeUrl = data.seasons[0].strBadge;
        setBadgeUrl(badgeUrl);

         setBadgeCache(prev => new Map(prev).set(leagueId, badgeUrl));
      } else {
        setBadgeError('No badge available for this league');
        setBadgeUrl(null);
      }

    } catch (err) {
      setBadgeError(err instanceof Error ? err.message : 'Failed to fetch badge');
      setBadgeUrl(null);
      console.error('Error fetching badge:', err);
    } finally {
      setBadgeLoading(false);
    }
  };

  const closeBadgeDisplay = () => {
    setBadgeUrl(null);
    setSelectedLeagueName(null);
    setBadgeError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading leagues...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Sports Leagues</h1>

        <LeagueFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedSport={selectedSport}
          onSportChange={handleSportChange}
          sportOptions={sportOptions}
        />

        <div className="mt-8">
          <p className="text-muted-foreground mb-4">
            Showing {filteredLeagues.length} of {allLeagues.length} leagues
          </p>

          <LeagueList
            leagues={filteredLeagues}
            onLeagueClick={handleLeagueClick}
            badgeUrl={badgeUrl}
            leagueName={selectedLeagueName}
            isLoading={badgeLoading}
            error={badgeError}
            onClose={closeBadgeDisplay}
            selectedLeagueId={filteredLeagues.find(l => l.strLeague === selectedLeagueName)?.idLeague ?? null}
          />
        </div>
      </div>
    </div>
  );
}
