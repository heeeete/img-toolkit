import { Outlet } from 'react-router';
import Header from './components/header';

export default function DefaultLayout() {
  return (
    <main className="relative mx-auto max-w-[1440px]">
      <Header />
      <div className="w-full max-w-[1440px] justify-center">
        <Outlet />
      </div>
    </main>
  );
}
