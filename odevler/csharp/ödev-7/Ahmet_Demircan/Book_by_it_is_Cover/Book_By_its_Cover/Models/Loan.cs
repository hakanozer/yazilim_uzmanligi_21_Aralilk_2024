namespace Book_By_its_Cover.Models
{
    public class Loan
    {
        public string? CustomerFullName { get; set; }
        public string? B_Name { get; set; }
        public int LoanID { get; set; }
        public int BookID { get; set; }
        public int CostumerID { get; set; }
        public int? LoanDate { get; set; }
        public int? ReturnDate { get; set; }
        public bool IsReturned { get; set; }
    }
}