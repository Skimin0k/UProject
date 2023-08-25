export enum BlockType {
    TEXT='TEXT',
    CODE='CODE',
    IMAGE='IMAGE',
}
export interface Block {
    id: string,
    type: BlockType
}

export interface TextBlock extends Block{
    type: BlockType.TEXT,
    title: string,
    paragraphs: string[]
}

export interface CodeBlock extends Block{
    type: BlockType.CODE,
    code: string
}

export interface ImageBlock extends Block{
    type: BlockType.IMAGE,
    src: string,
    title: string
}

export type Blocks = TextBlock | CodeBlock | ImageBlock

export interface Article {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    createdAt: string,
    type: string[],
    blocks: Blocks[]
}