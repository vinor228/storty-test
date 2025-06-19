'use client';

import { X } from 'lucide-react';

interface BadgeDisplayProps {
  badgeUrl: string | null;
  leagueName: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function BadgeDisplay({
  badgeUrl,
  leagueName,
  isLoading,
  error,
  onClose,
}: BadgeDisplayProps) {

  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '1px solid #E5E7EB',
        borderRadius: '0.5rem',
        padding: '1rem',
        maxWidth: '300px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
        marginTop: '0.5rem',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>
          {leagueName ? `${leagueName} Badge` : 'League Badge'}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <X size={16} />
        </button>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontSize: '1.125rem' }}>Loading badge...</div>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#DC2626' }}>
          {error}
        </div>
      )}

      {badgeUrl && !isLoading && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={badgeUrl}
            alt={`${leagueName} badge`}
            style={{
              maxWidth: '100%',
              maxHeight: '256px',
              borderRadius: '0.5rem',
              margin: '0 auto',
              display: 'block',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const errorDiv = document.createElement('div');
              errorDiv.textContent = 'Failed to load badge image';
              errorDiv.style.color = '#DC2626';
              target.parentNode?.appendChild(errorDiv);
            }}
          />
        </div>
      )}
    </div>
  );
}
