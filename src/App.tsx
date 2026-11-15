/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { ImageLightbox } from './components/ImageLightbox';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { JourneysPage, JourneyMissionId } from './pages/JourneysPage';
import { SimulationsPage } from './pages/SimulationsPage';
import { DataCatalogPage } from './pages/DataCatalogPage';
import { AboutPage } from './pages/AboutPage';
import { PosterPage } from './pages/PosterPage';
import { TeamProductsPage } from './pages/TeamProductsPage';
import { NasaMediaItem } from './data/museumData';

const VALID_BASE_ROUTES = [
  '/',
  '/kham-pha',
  '/hanh-trinh',
  '/journeys',
  '/mo-phong',
  '/simulations',
  '/du-lieu',
  '/data',
  '/luu-tru',
  '/trien-lam/opportunity',
  '/trien-lam/pioneer-11',
  '/trien-lam/surveyor-3',
  '/sleeping-explorers',
  '/san-pham',
  '/san-pham-doi',
  '/young-explorers',
  '/poster/opportunity',
  '/poster/pioneer-11',
  '/poster/surveyor-3',
  '/about'
];

const VALID_JOURNEY_MISSIONS: JourneyMissionId[] = [
  'opportunity',
  'pioneer-11',
  'surveyor-3',
  'viking-1',
  'sojourner'
];

function extractMissionParam(route: string): string | undefined {
  const withoutHash = route.split('#')[0];
  const basePath = withoutHash.split('?')[0].replace(/\/+$/, '') || '/';
  if (basePath === '/trien-lam/opportunity') return 'opportunity';
  if (basePath === '/trien-lam/pioneer-11') return 'pioneer-11';
  if (basePath === '/trien-lam/surveyor-3') return 'surveyor-3';

  const queryPart = withoutHash.includes('?') ? withoutHash.slice(withoutHash.indexOf('?') + 1) : '';
  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    const m = params.get('mission');
    if (m) return m;
  }

  if (route.includes('#device-')) {
    const hashPart = route.split('#device-')[1];
    if (hashPart) return hashPart.split('&')[0].split('?')[0];
  }

  return undefined;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    const search = window.location.search || '';
    const hash = window.location.hash || '';
    return VALID_BASE_ROUTES.includes(path) ? `${path}${search}${hash}` : '/';
  });

  const [lightboxItem, setLightboxItem] = useState<NasaMediaItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userAlias, setUserAlias] = useState<string | null>(() => {
    try {
      return localStorage.getItem('beyond_the_signal_alias') || null;
    } catch {
      return null;
    }
  });

  // Global Language state (Vietnamese / English) with LocalStorage persistence
  const [lang, setLang] = useState<'vi' | 'en'>(() => {
    try {
      const stored = localStorage.getItem('beyond_the_signal_lang');
      return stored === 'en' || stored === 'vi' ? stored : 'vi';
    } catch {
      return 'vi';
    }
  });

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi';
      try {
        localStorage.setItem('beyond_the_signal_lang', next);
      } catch {}
      return next;
    });
  };

  const navigateTo = (route: string) => {
    try {
      if (window.location.protocol !== 'file:') {
        window.history.pushState({}, '', route);
      }
    } catch {
      // Ignore pushState restrictions on file:// protocol
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct navigation to full-page Journeys storytelling experience instead of floating popup
  const handleOpenStoryPlayer = (machineId: 'opportunity' | 'pioneer-11' = 'opportunity') => {
    navigateTo(`/hanh-trinh?mission=${machineId || 'opportunity'}`);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
      const search = window.location.search || '';
      const hash = window.location.hash || '';
      setCurrentRoute(`${path}${search}${hash}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSetAlias = (alias: string | null) => {
    setUserAlias(alias);
    try {
      if (alias) {
        localStorage.setItem('beyond_the_signal_alias', alias);
      } else {
        localStorage.removeItem('beyond_the_signal_alias');
      }
    } catch {
      // Ignore storage errors
    }
  };

  const renderCurrentPage = () => {
    const basePath = (currentRoute.split('#')[0].split('?')[0] || '/').replace(/\/+$/, '') || '/';
    const missionParam = extractMissionParam(currentRoute);

    switch (basePath) {
      case '/kham-pha':
        return (
          <ExplorePage
            lang={lang}
            onNavigate={navigateTo}
            onOpenLightbox={setLightboxItem}
          />
        );

      case '/hanh-trinh':
      case '/journeys':
      case '/trien-lam/opportunity':
      case '/trien-lam/pioneer-11':
      case '/trien-lam/surveyor-3': {
        const journeyMissionId: JourneyMissionId | undefined =
          missionParam && VALID_JOURNEY_MISSIONS.includes(missionParam as JourneyMissionId)
            ? (missionParam as JourneyMissionId)
            : basePath === '/trien-lam/pioneer-11'
            ? 'pioneer-11'
            : basePath === '/trien-lam/surveyor-3'
            ? 'surveyor-3'
            : basePath === '/trien-lam/opportunity'
            ? 'opportunity'
            : undefined;
        return (
          <JourneysPage
            lang={lang}
            initialMissionId={journeyMissionId}
            onNavigate={navigateTo}
            onOpenLightbox={setLightboxItem}
          />
        );
      }

      case '/san-pham':
        return <TeamProductsPage onNavigate={navigateTo} />;

      case '/mo-phong':
      case '/simulations':
      case '/san-pham-doi':
      case '/young-explorers':
        return (
          <SimulationsPage
            key={`simulations-${missionParam || 'default'}`}
            lang={lang}
            onNavigate={navigateTo}
            onOpenLightbox={setLightboxItem}
          />
        );

      case '/du-lieu':
      case '/data':
      case '/luu-tru':
      case '/sleeping-explorers':
        return (
          <DataCatalogPage
            key={`data-${missionParam || 'default'}`}
            lang={lang}
            initialMissionId={missionParam}
            onNavigate={navigateTo}
            onOpenLightbox={setLightboxItem}
          />
        );

      case '/poster/opportunity':
        return <PosterPage missionId="opportunity" onNavigate={navigateTo} />;

      case '/poster/pioneer-11':
        return <PosterPage missionId="pioneer-11" onNavigate={navigateTo} />;

      case '/poster/surveyor-3':
        return <PosterPage missionId="surveyor-3" onNavigate={navigateTo} />;

      case '/about':
        return <AboutPage />;

      case '/':
      default:
        return (
          <HomePage
            lang={lang}
            onNavigate={navigateTo}
            onOpenLightbox={setLightboxItem}
            onOpenStoryPlayer={(id) => navigateTo(`/hanh-trinh?mission=${id || 'opportunity'}`)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060912] text-[#F0EDE5] selection:bg-[#D2A071]/30 selection:text-[#F0EDE5]">
      {/* Museum Header with Language Toggle, Search & Explorer ID Pass */}
      <TopBar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAuth={() => setIsAuthOpen(true)}
        userAlias={userAlias}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenStoryPlayer={handleOpenStoryPlayer}
      />

      {/* Main Exhibition Hall */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Museum Footnote & Citations */}
      <Footer onNavigate={navigateTo} lang={lang} />

      {/* Lightbox for Authentic NASA High-Res Media */}
      <ImageLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      {/* Explorer ID Pass Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentAlias={userAlias}
        onSetAlias={handleSetAlias}
        lang={lang}
      />
    </div>
  );
}
