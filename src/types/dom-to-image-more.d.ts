declare module 'dom-to-image-more' {
    export function toPng(node: Node, options?: object): Promise<string>;
    export function toJpeg(node: Node, options?: object): Promise<string>;
    export function toBlob(node: Node, options?: object): Promise<Blob>;
    export function toSvg(node: Node, options?: object): Promise<string>;
    export function toPixelData(node: Node, options?: object): Promise<Uint8ClampedArray>;
}
