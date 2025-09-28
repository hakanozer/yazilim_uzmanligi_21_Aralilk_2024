//bodyden datayı alıp, headerdan totali alıp, ikisini birleştirip dönebilmek amacı ile oluşturdum.
export interface PagedResult<T> {
  data: T[];
  total: number;
}