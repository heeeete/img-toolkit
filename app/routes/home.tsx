import { Link } from 'react-router';
import type { Route } from './+types/home';
import { useEffect, useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/api/todo')
      .then((res) => res.text())
      .then((text) => {
        const data = JSON.parse(text);
        console.log(data);
      });
  }, []);

  const handleTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    document.cookie = `theme=${theme}; path=/; max-age=31536000;`;

    if (theme === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDarkMode);
      root.classList.toggle('light', !isDarkMode);
      // localStorage.setItem('theme', 'system');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
      // localStorage.setItem('theme', theme);
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 flex flex-col">
        <button
          onClick={() => {
            handleTheme('light');
          }}
        >
          라이트
        </button>
        <button
          onClick={() => {
            handleTheme('dark');
          }}
        >
          다크
        </button>
        <button
          onClick={() => {
            handleTheme('system');
          }}
        >
          시스템
        </button>
      </div>
      <Link to="/image-compress">이미지 압축 ㄱㄱ</Link>
      <Link to="/image-format-conversion">이미지 포맷 변환 ㄱㄱ</Link>
      <Link to="/remove-bg">누끼따기 ㄱㄱ</Link>
    </div>
  );
}
