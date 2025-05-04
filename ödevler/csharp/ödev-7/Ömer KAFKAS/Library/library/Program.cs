using System;
using System.Data.SqlClient;
using library.Models;
using library.services;
using library.utils;
using library.actions;
using Library.library.Actions;
using Library.libraryActions;

namespace Library
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to the Library System!");
            Console.WriteLine("Please choose an action:");
            Console.WriteLine("1.Book Operations");
            Console.WriteLine("2.Member Operations");
            Console.WriteLine("3.Writer Operations");
            Console.WriteLine("4.Borrow Operations");
            Console.WriteLine("5.Exit");
            
            string choice = Console.ReadLine() ?? string.Empty;
            switch (choice)
            {
                case "1":
                    Console.WriteLine("Book Operations selected.");
                    Console.WriteLine("1. Add Book");
                    Console.WriteLine("2. Update Book");
                    Console.WriteLine("3. Delete Book");
                    Console.WriteLine("4. List Books");
                    switch (Console.ReadLine())
                    {
                        case "1":
                            ActionsBooks actionsBooks = new ActionsBooks();
                            actionsBooks.BookAdd();
                            break;
                        case "2":
                            ActionsBooks actionsBooksUpdate = new ActionsBooks();
                            actionsBooksUpdate.BookUpdate();
                            break;
                        case "3":
                            ActionsBooks actionsBooksDelete = new ActionsBooks();
                            actionsBooksDelete.BookDelete();
                            break;
                        case "4":
                            ActionsBooks actionsBooksList = new ActionsBooks();
                            actionsBooksList.BookList();
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            break;
                    }
                    break;
                case "2":
                    Console.WriteLine("Member Operations selected.");
                    Console.WriteLine("1. Add Member");
                    Console.WriteLine("2. Update Member");
                    Console.WriteLine("3. Delete Member");
                    Console.WriteLine("4. List Members");
                    switch (Console.ReadLine())
                    {
                        case "1":
                            ActionsMembers actionsMembers = new ActionsMembers();
                            actionsMembers.MemberAdd();
                            break;
                        case "2":
                            ActionsMembers actionsMembersUpdate = new ActionsMembers();
                            actionsMembersUpdate.MemberUpdate();
                            break;
                        case "3":
                            ActionsMembers actionsMembersDelete = new ActionsMembers();
                            actionsMembersDelete.MemberDelete();
                            break;
                        case "4":
                            ActionsMembers actionsMembersList = new ActionsMembers();
                            actionsMembersList.MemberList();
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            break;
                    }
                    break;
                case "3":
                    Console.WriteLine("Writer Operations selected.");
                    Console.WriteLine("1. Add Writer");
                    Console.WriteLine("2. Update Writer");
                    Console.WriteLine("3. Delete Writer");
                    Console.WriteLine("4. List Writers");
                    switch (Console.ReadLine())
                    {
                        case "1":
                            ActionsWriters actionsWriters = new ActionsWriters();
                            actionsWriters.WriterAdd();
                            break;
                        case "2":
                            ActionsWriters actionsWritersUpdate = new ActionsWriters();
                            actionsWritersUpdate.WriterUpdate();
                            break;
                        case "3":
                            ActionsWriters actionsWritersDelete = new ActionsWriters();
                            actionsWritersDelete.WriterDelete();
                            break;
                        case "4":
                            ActionsWriters actionsWritersList = new ActionsWriters();
                            actionsWritersList.WriterList();
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            break;
                    }
                    break;
                case "4":
                    Console.WriteLine("Borrow Operations selected.");
                    Console.WriteLine("1. Borrow Book");
                    Console.WriteLine("2. Update Borrow");
                    Console.WriteLine("3. Delete Borrow");
                    Console.WriteLine("4. List Borrows");
                    switch (Console.ReadLine())
                    {
                        case "1":
                            ActionsBorrows actionsBorrows = new ActionsBorrows();
                            actionsBorrows.BorrowAdd();
                            break;
                        case "2":
                            ActionsBorrows actionsBorrowsUpdate = new ActionsBorrows();
                            actionsBorrowsUpdate.BorrowUpdate();
                            break;
                        case "3":
                            ActionsBorrows actionsBorrowsDelete = new ActionsBorrows();
                            actionsBorrowsDelete.BorrowDelete();
                            break;
                        case "4":
                            ActionsBorrows actionsBorrowsList = new ActionsBorrows();
                            actionsBorrowsList.BorrowList();
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            break;
                    }
                    break;
                case "5":
                    Console.WriteLine("Exiting the system. Goodbye!");
                    break;
                default:
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}