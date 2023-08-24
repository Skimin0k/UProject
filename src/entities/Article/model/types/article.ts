export enum BlockType {
    TEXT='TEXT',
    CODE='CODE',
    IMAGE='IMAGE',
}
interface Block {
    id: string,
    type: BlockType
}

interface TextBlock extends Block{
    type: BlockType.TEXT,
    title: string,
    paragraphs: string[]
}

interface CodeBlock extends Block{
    type: BlockType.CODE,
    code: string
}

interface ImageBlock extends Block{
    type: BlockType.IMAGE,
    src: string,
    title: string
}

type Blocks = TextBlock | CodeBlock | ImageBlock

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