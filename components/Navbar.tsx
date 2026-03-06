'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import CloseIcon from '@/assets/close.png';
import Logo from '@/assets/superteamMY_logo_transparent.png';
import TelegramIcon from '@/assets/telegram.png';
import TwitterIcon from '@/assets/twitter.png';
import MenuIcon from '@/assets/lines.png';

/**
 * Describes a single navigation link in the main navbar.
 */
interface NavbarLink {
  label: string;
  href: string;
}

/**
 * Static configuration for all primary navigation links.
 */
const NAVBAR_LINKS: NavbarLink[] = [
  { label: 'Mission', href: '#mission' },
  { label: 'Event', href: '#event' },
  { label: 'Member', href: '#member' },
  { label: 'Partners', href: '#partners' },
  { label: 'Wall of Love', href: '#wall-of-love' },
  { label: 'FAQ', href: '#faq' },
  { label: 'CTA', href: '#cta' },
];

/**
 * Top-level navigation bar with glassmorphism styling, centered links,
 * and responsive hamburger menu below a 1200px viewport width.
 * Mobile menu expands the existing navbar downward (no side overlay).
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1200;
      setIsDesktop(isNowDesktop);

      if (isNowDesktop) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div
        className={`mx-auto max-w-5xl rounded-2xl border border-white/10 bg-black/30 shadow-lg backdrop-blur-xl ${
          !isDesktop ? 'flex flex-col' : ''
        }`}
      >
        {/* Top row: logo, center links or empty, right = hamburger/close or social */}
        <div className="flex items-center justify-between px-6 py-3">
          <Link
            href="/"
            aria-label="Superteam MY home"
            className="flex shrink-0 items-center"
          >
            <Image
              src={Logo}
              alt="Superteam Malaysia logo"
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="flex flex-1 items-center justify-center">
            {isDesktop && (
              <ul className="flex items-center gap-6 text-sm font-medium text-white/90">
                {NAVBAR_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isDesktop && (
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Open X profile"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/90 transition hover:text-white"
              >
                <Image src={TwitterIcon} alt="X logo" className="h-4 w-4" />
              </Link>
              <Link
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Telegram channel"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/90 transition hover:text-white"
              >
                <Image src={TelegramIcon} alt="Telegram logo" className="h-4 w-4" />
              </Link>
            </div>
          )}

          {!isDesktop && (
            <div className="flex shrink-0 items-center justify-end">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition hover:text-white"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <Image
                  src={isMenuOpen ? CloseIcon : MenuIcon}
                  alt={isMenuOpen ? 'Close menu' : 'Open menu'}
                  className="h-5 w-5"
                />
              </button>
            </div>
          )}
        </div>

        {/* Expanded content: same navbar box grows downward (mobile only), animated */}
        {!isDesktop && (
          <div
            className="grid"
            style={{
              gridTemplateRows: isMenuOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.3s ease-in-out',
            }}
            role="region"
            aria-label="Navigation links"
            aria-hidden={!isMenuOpen}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col border-t border-white/10 px-6 pb-6 pt-4">
                <ul className="flex flex-col items-end gap-3 text-base font-medium text-white/90">
                  {NAVBAR_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={handleMobileLinkClick}
                        className="py-1.5 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex justify-end gap-3">
                  <Link
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open X profile"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition hover:text-white"
                  >
                    <Image src={TwitterIcon} alt="X logo" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Telegram channel"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition hover:text-white"
                  >
                    <Image src={TelegramIcon} alt="Telegram logo" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
