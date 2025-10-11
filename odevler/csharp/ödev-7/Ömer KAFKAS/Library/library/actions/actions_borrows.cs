using library.services;
using library.Models;


namespace Library.library.Actions
{
    public class ActionsBorrows
    {
        services_borrows _servicesBorrows = new services_borrows();
        public void BorrowAdd()
        {
            Console.WriteLine("Enter Borrow ID:");
            int borrowId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Book ID:");
            int bookId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Member ID:");
            int memberId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Borrow Date (yyyy-mm-dd):");
            string input = Console.ReadLine() ?? string.Empty;
            DateTime borrowDate;
            if (!DateTime.TryParse(input, out borrowDate))
            {
                borrowDate = DateTime.Now;
            }

            Borrows borrow = new Borrows(borrowId, bookId, memberId, borrowDate, null, 0);

            int result = _servicesBorrows.AddBorrow(borrow);

            if (result > 0)
                Console.WriteLine("Borrow added successfully.");
            else
                Console.WriteLine("Failed to add borrow.");
        }
        public void BorrowUpdate()
        {
            Console.WriteLine("Enter Borrow ID to update:");
            int borrowId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Book ID:");
            int bookId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Member ID:");
            int memberId = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Borrow Date (yyyy-mm-dd):");
            string input = Console.ReadLine() ?? string.Empty;
            DateTime borrowDate;
            if (!DateTime.TryParse(input, out borrowDate))
            {
                borrowDate = DateTime.Now;
            }

            Console.WriteLine("Enter Return Date (yyyy-mm-dd):");
            string returnDateInput = Console.ReadLine() ?? string.Empty;
            DateTime returnDate;
            if (!DateTime.TryParse(returnDateInput, out returnDate))
            {
                returnDate = DateTime.Now;
            }
            Borrows borrow = new Borrows(borrowId, bookId, memberId, borrowDate, returnDate, 0);

            int result = _servicesBorrows.UpdateBorrow(borrow);

            if (result > 0)
                Console.WriteLine("Borrow updated successfully.");
            else
                Console.WriteLine("Failed to update borrow.");
        }
        public void BorrowDelete()
        {
            Console.WriteLine("Enter Borrow ID to delete:");
            int borrowId = Convert.ToInt32(Console.ReadLine());

            int result = _servicesBorrows.DeleteBorrow(borrowId);

            if (result > 0)
                Console.WriteLine("Borrow deleted successfully.");
            else
                Console.WriteLine("Failed to delete borrow.");
        }
        public void BorrowList()
        {
            List<Borrows> borrowsList = _servicesBorrows.GetBorrows();
            if (borrowsList.Count == 0)
            {
                Console.WriteLine("No borrows found.");
            }
            else
            {
                Console.WriteLine("Borrows List:");
                foreach (var b in borrowsList)
                {
                    Console.WriteLine($"ID: {b.BorrowsId}, Book ID: {b.BookId}, Member ID: {b.MemberId}, Borrow Date: {b.BorrowDate}, Return Date: {b.ReturnDate}");
                }
            }
        }
    }
}