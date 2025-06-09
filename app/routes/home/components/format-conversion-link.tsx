import { ArrowDown } from 'lucide-react';

import ConvertButtonSVG from '~/components/svg/convert-button.svg?react';
import { TextLoop } from '~/components/ui/text-loop';

export default function FormatConversionLink() {
  return (
    <button className="relative flex items-center justify-center drop-shadow-main">
      <ConvertButtonSVG />
      <div className="absolute flex w-full flex-col">
        <span className="text-center text-[40px] font-semibold text-other-blue">IMG</span>
        <span className="flex justify-center">
          <ArrowDown />
        </span>
        <TextLoop
          className="overflow-y-clip text-center text-[40px] font-semibold text-other-blue"
          transition={{
            type: 'spring',
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: 'blur(4px)',
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: 'blur(0px)',
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: 'blur(4px)',
            },
          }}
        >
          <span>JPG</span>
          <span>WEBP</span>
        </TextLoop>
        <span className="typo-button-1">변환하기</span>
      </div>
    </button>
  );
}
