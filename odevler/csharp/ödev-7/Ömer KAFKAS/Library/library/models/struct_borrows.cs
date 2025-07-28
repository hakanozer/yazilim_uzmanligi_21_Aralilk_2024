namespace library.Models
{
    public struct Borrows
    {
        public int BorrowsId { get; set; }

        public int BookId { get; set; }

        public int MemberId { get; set; }

        public DateTime BorrowDate { get; set; }

        public DateTime? ReturnDate { get; set; }
        
        public int Difference { get; set; }

        public Borrows(int borrows_id, int books_id, int member_id, DateTime borrows_date, DateTime? return_date, int difference)
        {
            BorrowsId = borrows_id;
            BookId = books_id;
            MemberId = member_id;
            BorrowDate = borrows_date;
            ReturnDate = return_date;
            Difference = difference;
        }
    }
}