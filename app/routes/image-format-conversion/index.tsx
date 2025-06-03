import React, { useState } from 'react';
import pica from 'pica';
import { downloadBlob, replaceFormat } from '~/lib/utils';

const QUALITY = 0.8;

type ConvertibleFormat = 'jpeg' | 'webp';

// Source 포맷별 허용 대상 포맷
const getAllowedTargetFormats = (type: string): ConvertibleFormat[] => {
  if (type === 'image/png') return ['jpeg', 'webp'];
  if (type === 'image/jpeg') return ['webp'];
  if (type === 'image/webp') return ['jpeg'];
  return ['jpeg'];
};

export default function ImageFormatConversion() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<ConvertibleFormat[]>([]);
  const [convertedBlobs, setConvertedBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(selected);
    const initialFormats = selected.map((file) => getAllowedTargetFormats(file.type)[0]);
    setSelectedFormats(initialFormats);
    setConvertedBlobs([]);
  };

  const handleFormatChange = (index: number, format: ConvertibleFormat) => {
    setSelectedFormats((prev) => {
      const copy = [...prev];
      copy[index] = format;
      return copy;
    });
  };

  const handleConvert = async () => {
    if (!files.length) return;
    setLoading(true);
    const p = pica();

    try {
      const blobs = await Promise.all(
        files.map(async (file, i) => {
          const target = selectedFormats[i];
          const mime = `image/${target}`;
          const imgBmp = await createImageBitmap(file);

          const canvas = document.createElement('canvas');
          canvas.width = imgBmp.width;
          canvas.height = imgBmp.height;

          const result = await p.resize(imgBmp, canvas);
          const blob = await p.toBlob(result, mime, QUALITY);
          return blob;
        }),
      );
      setConvertedBlobs(blobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    convertedBlobs.forEach((blob, idx) => {
      const ext = selectedFormats[idx] === 'jpeg' ? 'jpg' : selectedFormats[idx];
      const name = replaceFormat(files[idx].name, ext);
      downloadBlob(blob, name);
    });
  };

  return (
    <div className="space-y-4 p-4">
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp"
        multiple
        onChange={handleFileSelect}
        className="block"
      />

      {files.length > 0 && (
        <div>
          {files.map((file, idx) => (
            <div key={idx}>{Math.round((file.size / 1024 / 1024) * 100) / 100} MB</div>
          ))}
          <h2 className="font-medium">Selected ({files.length})</h2>
          <ul className="list-inside list-disc space-y-2">
            {files.map((file, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="text-sm">{file.name}</span>
                <span>
                  {Math.round(((convertedBlobs[i]?.size || 0) / 1024 / 1024) * 100) / 100}{' '}
                  MB
                </span>
                <select
                  value={selectedFormats[i]}
                  onChange={(e) =>
                    handleFormatChange(i, e.target.value as ConvertibleFormat)
                  }
                  className="rounded border p-1 text-sm"
                >
                  {getAllowedTargetFormats(file.type).map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt === 'jpeg' ? 'JPG' : fmt.toUpperCase()}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleConvert}
          disabled={loading || !files.length}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? '변환 중...' : '변환하기'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!convertedBlobs.length}
          className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          다운로드
        </button>
      </div>

      {convertedBlobs.length > 0 && (
        <p className="text-sm text-gray-500">
          다운로드 버튼을 눌러 변환된 이미지를 받아보세요.
        </p>
      )}
    </div>
  );
}
