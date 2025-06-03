declare module 'pica' {
  export interface PicaResizeOptions {
    filter?:
      | 'box'
      | 'hamming'
      | 'lanczos2'
      | 'lanczos3'
      | 'mks2013';
    unsharpAmount?: number;
    unsharpRadius?: number;
    unsharpThreshold?: number;
  }

  export interface Pica {
    resize(
      from:
        | HTMLCanvasElement
        | HTMLImageElement
        | ImageBitmap,
      to: HTMLCanvasElement,
      options?: PicaResizeOptions,
    ): Promise<HTMLCanvasElement>;

    toBlob(
      canvas: HTMLCanvasElement,
      mimeType: string,
      quality?: number,
    ): Promise<Blob>;
  }

  const pica: () => Pica;
  export default pica;
}
