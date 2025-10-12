export interface IResult {
  code: number;
  success: boolean;
  message: string;
  data: any;
}

export const jsonResult = (
  code: number,
  success: boolean,
  message: string,
  data: any
): IResult => {
  return { code, success, message, data };
};