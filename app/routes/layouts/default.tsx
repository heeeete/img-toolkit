import { Link, Outlet, useLocation } from 'react-router';
import Logo from '~/components/svg/img-logo.svg?react';
import { cn } from '~/lib/utils';

export default function DefaultLayout() {
  const { pathname } = useLocation();

  return (
    <main className="relative mx-auto max-w-[1440px]">
      <header className="relative h-[124px] bg-red-200 p-[40px_20px]">
        <Link to={'/'} className="absolute top-3 left-5">
          <Logo />
        </Link>

        <nav className="mx-auto w-full max-w-[800px]">
          <ul className="flex flex-1 items-center justify-between gap-[5px]">
            <li className="flex-1 border">
              <Link className="inline-block w-full bg-amber-200 py-5" to={'/'}>
                이미지 배경 제거
              </Link>
            </li>
            <li
              className={cn(
                'border transition-all',
                pathname === '/image-format-conversion' ? 'flex-2' : 'flex-1',
              )}
            >
              <Link
                to="/image-format-conversion"
                className="inline-block w-full bg-amber-200 py-5"
              >
                이미지 변환
              </Link>
            </li>
            <li className="flex-1 border">
              <Link className="inline-block w-full bg-amber-200 py-5" to={'/contact'}>
                이미지 압축
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
