export interface INote extends Document{
    title: string;
    detail: string;
    date: Date;
    color: EXT_sRGB
}