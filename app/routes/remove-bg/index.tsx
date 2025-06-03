import { useState } from 'react';
import { downloadBlob, replaceFormat } from '~/lib/utils';

export default function RemoveBg() {
  const [image, setImages] = useState<File>();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(e.target.files[0]);
  };

  const handleRemoveBg = async () => {
    if (!image) return alert('이미지를 선택해주세요.');

    const form = new FormData();
    // name="image" 으로 여러 파일 append
    form.append('image', image);

    try {
      const res = await fetch('/python/remove-background', {
        method: 'POST',
        body: form,
        // 헤더에 Content-Type 직접 설정하지 마세요.
        // 브라우저가 자동으로 multipart/form-data; boundary=... 로 알아서 붙입니다.
      });

      // JSON 반환이라면
      const blob = await res.blob();

      const fileName = replaceFormat(image.name, 'png');
      downloadBlob(blob, fileName);
    } catch (e) {
      console.error(e);
      alert('서버 호출 중 오류가 발생했습니다.');
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        onChange={handleImageSelect}
        className="block"
      />

      <div className="mt-4">
        <div className="mb-2">
          {image && (
            <img src={URL.createObjectURL(image)} alt={`Selected `} className="" />
          )}
        </div>
      </div>

      <button onClick={handleRemoveBg}>배경지우기</button>
    </div>
  );
}
