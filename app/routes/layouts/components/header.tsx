import { Link, useLocation } from 'react-router';
import Logo from '~/components/svg/img-logo.svg?react';
import { cn } from '~/lib/utils';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="relative z-50 h-[124px] p-[40px_20px]">
      <Link to={'/'} className="absolute top-3 left-5">
        <Logo className="" />
      </Link>

      <nav className="mx-auto w-full max-w-[800px]">
        <ul className="flex flex-1 items-center justify-between gap-[5px]">
          <li
            className={cn(
              'overflow-hidden shadow-header transition-all',
              pathname === '/remove-bg'
                ? 'header-gradient-left flex-2 rounded-[80px]'
                : 'flex-1 rounded-l-[80px] rounded-r-[10px]',
            )}
          >
            <Link className="inline-block w-full py-5 text-center" to={'/remove-bg'}>
              이미지 배경 제거
            </Link>
          </li>
          <li
            className={cn(
              'overflow-hidden shadow-header transition-all',
              pathname === '/image-format-conversion'
                ? 'header-gradient-center flex-2 rounded-[80px]'
                : 'flex-1 rounded-[10px]',
            )}
          >
            <Link
              to="/image-format-conversion"
              className="inline-block w-full py-5 text-center"
            >
              이미지 변환
            </Link>
          </li>
          <li
            className={cn(
              'overflow-hidden shadow-header transition-all',
              pathname === '/image-compress'
                ? 'header-gradient-right flex-2 rounded-[80px]'
                : 'flex-1 rounded-l-[10px] rounded-r-[80px]',
            )}
          >
            <Link className="inline-block w-full py-5 text-center" to={'/image-compress'}>
              이미지 압축
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
