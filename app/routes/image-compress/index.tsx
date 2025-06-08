import type { Route } from './+types/index';
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import { TextLoop } from '~/components/ui/text-loop';

export function meta({}: Route.MetaArgs) {
  return [
    { title: '이미지 압축' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<File[]>([]);

  console.log(images);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No file selected');
      return;
    }

    Array.from(event.target.files).forEach((image) => {
      console.log('originalFile instanceof Blob', image instanceof Blob); // true
      console.log(`originalFile size ${image.size / 1024 / 1024} MB`);
    });

    setImages(Array.from(event.target.files as unknown as File[]));
  };

  const handleCompress = async () => {
    const options = {
      maxSizeMB: 1, // 🔥 최대 0.3MB로 강제 제한 (작게 만들기 위함)
      maxWidthOrHeight: 1024, // 📏 모바일/웹 최적화 해상도
      useWebWorker: true, // ✅ UI 멈추지 않게
      maxIteration: 15, // 🔁 더 세밀한 반복 압축 허용
      onProgress: (p: number) => console.log(`압축 진행률: ${p}%`),
    };

    try {
      const compressedFiles = await Promise.all(
        images.map((image) => imageCompression(image, options)),
      );
      compressedFiles.forEach((compressedFile) => {
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        // await uploadToServer(compressedFile); // write your own logic
      });
      setCompressedImages(compressedFiles as unknown as File[]);
      console.log(compressedFiles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    const blobUrls = compressedImages.map((file) => URL.createObjectURL(file));

    blobUrls.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `test_${images[index].name}`; // 번호 붙이면 덮어쓰기 방지
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageUpload}
        multiple
      />
      <button onClick={handleCompress}>압축하기</button>
      <button onClick={handleDownload}>다운로드</button>

      {/* <div className="inline-flex text-sm whitespace-pre-wrap">
        Beautiful templates for{' '}
        <TextLoop
          className="overflow-y-clip"
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
          <span>Founders</span>
          <span>Developers</span>
          <span>Designers</span>
          <span>Design Engineers</span>
        </TextLoop>
      </div> */}
    </div>
  );
}
