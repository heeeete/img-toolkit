import CompressButtonSVG from '~/components/svg/compress-button.svg?react';
import CompressSVG from '~/components/svg/compress-icon.svg?react';
import { motion } from 'motion/react';

export default function CompressLink() {
  return (
    <button className="relative drop-shadow-main">
      <CompressButtonSVG />
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center space-y-6">
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: [1, 0.7, 0.8, 0.6, 1.2, 1] }} // 키프레임을 두 개로 줄임
          transition={{
            duration: 2,
            times: [0, 0.4, 0.5, 0.9, 0.95, 1],
            repeatDelay: 1,
            repeatType: 'loop',
            repeat: Infinity,
          }}
        >
          <CompressSVG />
        </motion.div>
        <span className="typo-button-1">이미지 압축</span>
      </div>
    </button>
  );
}
