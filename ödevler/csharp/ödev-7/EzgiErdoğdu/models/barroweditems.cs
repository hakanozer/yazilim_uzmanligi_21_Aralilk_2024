namespace LibraryManagementSystem.Models
{
    public struct Borrowed
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int MemberId { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime? ReturnDate { get; set; }

        public Borrowed(int id, int bookId, int memberId, DateTime borrowDate, DateTime? returnDate)
        {
            Id = id;
            BookId = bookId;
            MemberId = memberId;
            BorrowDate = borrowDate;
            ReturnDate = returnDate;
        }
    }
}