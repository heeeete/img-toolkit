import type { Route } from './+types';
import { useEffect, useState } from 'react';
import RemoveBgSVG from '~/components/svg/remove-bg-icon.svg?react';
import GreenBlobsSVG from '~/components/svg/green-blobs.svg?react';
import BlueBlobsSVG from '~/components/svg/blue-blobs.svg?react';
import { motion } from 'motion/react';
import FormatConversionLink from './components/format-conversion-link';
import CompressLink from './components/compress-link';

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
    <>
      <div className="relative z-10 flex h-[calc(100dvh-124px)] items-center justify-center space-x-[100px]">
        <div className="space-y-14">
          <h1 className="w-[430px] typo-h1">무료로 다양한 이미지 편집을 해보세요</h1>
          <div className="space-y-4 typo-body-2">
            <p>업로드한 이미지는 어떠한 곳에도 저장되지 않습니다.</p>
            <p>모든 서비스는 횟수 제한 없이 무료로 이용하실 수 있습니다.</p>
          </div>
        </div>
        <div className="flex w-fit flex-col items-center space-y-10">
          <button className="flex h-[200px] w-[375px] flex-col items-center justify-center space-y-6 rounded-4xl bg-white shadow-main">
            <RemoveBgSVG />
            <span className="typo-button-1">이미지 배경 제거</span>
          </button>
          <div className="flex space-x-10">
            <FormatConversionLink />
            <CompressLink />
          </div>
        </div>
        {/* <div className="fixed bottom-0 flex flex-col">
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
              <Link to="/remove-bg">누끼따기 ㄱㄱ</Link> */}
      </div>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -top-[50px] -right-[300px] z-0"
      >
        <BlueBlobsSVG />
      </motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 0.8 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[50px] -left-[300px] z-0"
      >
        <GreenBlobsSVG />
      </motion.div>
    </>
  );
}
