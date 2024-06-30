import { Inter, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import classNames from 'classnames';
import Navigation from './Navigation';

export const hubotSans = localFont({
  src: '../../../public/Hubot-Sans.woff2',
  variable: '--font-hubot-sans',
  weight: '700',
  declarations: [{ prop: 'font-stretch', value: '125%' }],
  display: 'block',
  preload: true,
});

export const console = IBM_Plex_Mono({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-console',
});

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${hubotSans.variable} relative font-sans ${console.variable} flex flex-row gap-5`}
      style={inter.style}
    >
      <header className="fixed top-0 z-40 h-full w-80">
        <Navigation />
      </header>
      <main className={classNames('ml-80 w-full p-8')}>{children}</main>
    </div>
  );
}
