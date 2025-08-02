namespace Book_By_its_Cover.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string? CustomerFullName { get; set; }
        public string CMail { get; set; } = null!;
        public string CPhone { get; set; } = null!;
    }
}