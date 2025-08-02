using System;
using System.Data;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Services;


namespace LibraryManagementSystem;
class Program
{
    static void Main(string[] args)
    {
        AuthorService authorService = new AuthorService();
        BookService bookService = new BookService();
        MemberService memberService = new MemberService();
        BorrowedService borrowedService = new BorrowedService();


        Console.WriteLine("Yapmak İstediğiniz İşlemi Giriniz:");
        string? operation = Console.ReadLine();

        switch (operation)
        {
            case "Yazar Ekle":
                Console.WriteLine("Yazar Adını Giriniz");
                string authorName = Console.ReadLine();
                Console.WriteLine("Yazar Soyadını Giriniz");
                string authorSurname = Console.ReadLine();

                Author author = new Author(0, authorName, authorSurname);
                int result = authorService.AddAuthors(author);
                Console.WriteLine("Yazar Eklendi: " + result);
                break;
            case "Yazar Güncelle":
                Console.WriteLine("Güncellenecek yazarın ID'sini giriniz:");
                int authorId = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Yeni Yazar Adını Giriniz");
                string newAuthorName = Console.ReadLine();
                Console.WriteLine("Yeni Yazar Soyadını Giriniz");
                string newAuthorSurname = Console.ReadLine();
                Author authorToUpdate = new Author(authorId, newAuthorName, newAuthorSurname);
                int updateResult = authorService.UpdateAuthor(authorToUpdate);
                Console.WriteLine("Yazar Güncellendi: " + updateResult);
                break;
            case "Yazar Sil":
                Console.WriteLine("Silinecek yazarın ID'sini giriniz:");
                int deleteAuthorId = Convert.ToInt32(Console.ReadLine());
                int deleteResult = authorService.DeleteAuthor(deleteAuthorId);
                Console.WriteLine("Yazar Silindi: " + deleteResult);
                break;
            case "Yazar Listele":
                List<Author> authors = authorService.GetAuthors();
                foreach (var item in authors)
                {
                    Console.WriteLine($"ID: {item.Aid}, Ad: {item.Name}, Soyad: {item.Surname}");
                }
                break;
            case "Kitap Ekle":
                Console.WriteLine("Kitap Adını Giriniz");
                string bookName = Console.ReadLine();
                Console.WriteLine("Yazar ID'sini Giriniz");
                int authorIdForBook = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Yayın Yılını Giriniz");
                DateTime year = Convert.ToDateTime(Console.ReadLine());
                Console.WriteLine("ISBN Numarasını Giriniz");
                string isbn = Console.ReadLine();

                Book book = new Book(0, bookName, authorIdForBook, year, isbn);
                int bookResult = bookService.AddBook(book);
                Console.WriteLine("Kitap Eklendi: " + bookResult);
                break;
            case "Kitap Güncelle":
                Console.WriteLine("Güncellenecek kitabın ID'sini giriniz:");
                int bookId = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Yeni Kitap Adını Giriniz");
                string newBookName = Console.ReadLine();
                Console.WriteLine("Yeni Yazar ID'sini Giriniz");
                int newAuthorIdForBook = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Yeni Yayın Yılını Giriniz");
                DateTime newYear = Convert.ToDateTime(Console.ReadLine());
                Console.WriteLine("Yeni ISBN Numarasını Giriniz");
                string newIsbn = Console.ReadLine();

                Book bookToUpdate = new Book(bookId, newBookName, newAuthorIdForBook, newYear, newIsbn);
                int updateBookResult = bookService.UpdateBook(bookToUpdate);
                Console.WriteLine("Kitap Güncellendi: " + updateBookResult);
                break;
            case "Kitap Sil":
                Console.WriteLine("Silinecek kitabın ID'sini giriniz:");
                int deleteBookId = Convert.ToInt32(Console.ReadLine());
                int deleteBookResult = bookService.DeleteBook(deleteBookId);
                Console.WriteLine("Kitap Silindi: " + deleteBookResult);
                break;
            case "Kitap Listele":
                List<Book> books = bookService.GetBooks();
                foreach (var item in books)
                {
                    Console.WriteLine($"ID: {item.bid}, Ad: {item.bookname}, Yazar ID: {item.aid}, Yayın Yılı: {item.year}, ISBN: {item.isbn}");
                }
                break;
            case "Üye Ekle":
                Console.WriteLine("Üye Adını Giriniz");
                string memberName = Console.ReadLine();
                Console.WriteLine("Üye Soyadını Giriniz");
                string memberSurname = Console.ReadLine();
                Console.WriteLine("Üye Telefon Numarasını Giriniz");
                string memberPhone = Console.ReadLine();
                Console.WriteLine("Üye E-posta Adresini Giriniz");
                string memberEmail = Console.ReadLine();
                Member member = new Member(0, memberName, memberSurname, memberPhone, memberEmail);
                int memberResult = memberService.AddMember(member);
                Console.WriteLine("Üye Eklendi: " + memberResult);
                break;
            case "Üye Güncelle":
                Console.WriteLine("Güncellenecek üyenin ID'sini giriniz:");
                int memberId = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Yeni Üye Adını Giriniz");
                string newMemberName = Console.ReadLine();
                Console.WriteLine("Yeni Üye Soyadını Giriniz");
                string newMemberSurname = Console.ReadLine();
                Console.WriteLine("Yeni Üye Telefon Numarasını Giriniz");
                string newMemberPhone = Console.ReadLine();
                Console.WriteLine("Yeni Üye E-posta Adresini Giriniz");
                string newMemberEmail = Console.ReadLine();
                Member memberToUpdate = new Member(memberId, newMemberName, newMemberSurname, newMemberPhone, newMemberEmail);
                int updateMemberResult = memberService.UpdateMember(memberToUpdate);
                Console.WriteLine("Üye Güncellendi: " + updateMemberResult);
                break;
            case "Üye Sil":
                Console.WriteLine("Silinecek üyenin ID'sini giriniz:");
                int deleteMemberId = Convert.ToInt32(Console.ReadLine());
                int deleteMemberResult = memberService.DeleteMember(deleteMemberId);
                Console.WriteLine("Üye Silindi: " + deleteMemberResult);
                break;
            case "Üye Listele":
                List<Member> members = memberService.GetMembers();
                foreach (var item in members)
                {
                    Console.WriteLine($"ID: {item.mid}, Ad: {item.name}, Soyad: {item.surname}, Telefon: {item.phone}, E-posta: {item.email}");
                }
                break;
            case "Kitap Ödünç Alma":

                List<Book> datas = bookService.GetBooks();
                foreach (var item in datas)
                {
                    Console.WriteLine($"ID: {item.bid}, Ad: {item.bookname}, Yazar ID: {item.aid}, Yayın Yılı: {item.year}, ISBN: {item.isbn}");
                }
                Console.WriteLine("Ödünç alınacak kitabın ID numarasını giriniz:");
                int borrowedBookId = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Ödünç alan üyenin ID'sini giriniz:");
                int borrowedMemberId = Convert.ToInt32(Console.ReadLine());

                Borrowed borrowed = new Borrowed(0, borrowedBookId, borrowedMemberId, DateTime.Now, null);

                int borrowedResult = borrowedService.AddBorrowed(borrowed);
                Console.WriteLine("Ödünç Alındı: " + borrowedResult);
                break;
            case "Ödünç Kitap İade":
                Console.WriteLine("İade edilecek ödünç kitabın ID'sini giriniz:");
                int returnBookId = Convert.ToInt32(Console.ReadLine());
                DateTime returnDate = DateTime.Now;

                Borrowed borrowedToUpdate = new Borrowed(returnBookId, 0, 0, DateTime.Now, returnDate);
                int returnResult = borrowedService.UpdateBorrowed(borrowedToUpdate);
                Console.WriteLine("Ödünç İade Edildi: " + returnResult);
                break;
            case "Ödünç Kitap Listele":
                List<Borrowed> borrowedList = borrowedService.GetBorrowed();
                foreach (var item in borrowedList)
                {
                    Console.WriteLine($"ID: {item.Id}, Kitap ID: {item.BookId}, Üye ID: {item.MemberId}, Ödünç Alma Tarihi: {item.BorrowDate}, İade Tarihi: {item.ReturnDate}");
                }
                break;
            case "En Çok Ödünç Alınan Kitap":
                List<OduncSayisi> oduncSayisiList = borrowedService.OduncSayisi();
                foreach (var item in oduncSayisiList)
                {
                    Console.WriteLine($"Kitap Adı: {item.bookname}, Ödünç Sayısı: {item.oduncsayisi}");
                }
                break;
            
                case "İade Olmayan Kitaplar":
                List<iadeolmayanlar> iadeOlmayanList = borrowedService.IadeOlmayanlar();
                foreach (var item in iadeOlmayanList)
                {
                    Console.WriteLine($"Kitap Adı: {item.bookname}");
                }
                break;
                 default:
                Console.WriteLine("Geçersiz işlem.");
                break;
        }


    }

}

