import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { NavigationProgress } from './components/navigation-progress';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
  },
];

// ThemeInit.tsx — HTML `<head>`에 삽입할 초기 스크립트 컴포넌트
// export function ThemeInit() {
//   const inlineScript = `
// 		(function () {
// 			const theme = localStorage.getItem("theme");
// 			if (theme === "dark") {
// 				document.documentElement.classList.add("dark");
// 			} else if (theme === "light") {
// 				document.documentElement.classList.remove("dark");
// 			} else {
// 				const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// 				document.documentElement.classList.toggle("dark", isDark);
// 			}
// 		})();
// 	`;

//   return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />;
// }

export const loader = ({ request }: Route.LoaderArgs) => {
  const theme = request.headers.get('cookie');
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="">
        <NavigationProgress />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
