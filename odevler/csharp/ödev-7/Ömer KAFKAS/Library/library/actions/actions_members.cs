using library.services;
using library.Models;

namespace Library.library.Actions
{
    public class ActionsMembers
    {
        services_members _servicesMembers = new services_members();
        
        public void MemberAdd()
        {
            Console.WriteLine("Enter Member ID:");
            int memberId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Member Name:");
            string name = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Member Surname:");
            string surname = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Member Phone Number:");
            string phoneNumber = Console.ReadLine() ?? string.Empty;
            
            Member member = new Member(memberId, name, surname, phoneNumber, phoneNumber);
            
            int result = _servicesMembers.AddMember(member);
            
            if (result > 0)
                Console.WriteLine("Member added successfully.");
            else
                Console.WriteLine("Failed to add member.");
        }
        
        public void MemberUpdate()
        {
            Console.WriteLine("Enter Member ID to update:");
            int memberId = Convert.ToInt32(Console.ReadLine());
            
            Console.WriteLine("Enter Member Name:");
            string name = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Member Surname:");
            string surname = Console.ReadLine() ?? string.Empty;
            
            Console.WriteLine("Enter Member Phone Number:");
            string phoneNumber = Console.ReadLine() ?? string.Empty;
            
           Member member = new Member(memberId, name, surname, phoneNumber, phoneNumber);
            
            int result = _servicesMembers.UpdateMember(member);
            
            if (result > 0)
                Console.WriteLine("Member updated successfully.");
            else
                Console.WriteLine("Failed to update member.");
        }
        
        public void MemberDelete()
        {
            Console.WriteLine("Enter Member ID to delete:");
            int memberId = Convert.ToInt32(Console.ReadLine());
            
            int result = _servicesMembers.DeleteMember(memberId);
            
            if (result > 0)
                Console.WriteLine("Member deleted successfully.");
            else
                Console.WriteLine("Failed to delete member.");
        }
        
        public void MemberList()
        {
            List<Member> membersList = _servicesMembers.listMembers();
            
            if (membersList.Count > 0)
            {
                Console.WriteLine("Members List:");
                foreach (var member in membersList)
                {
                    Console.WriteLine($"ID: {member.MemberID}, Name: {member.MemberName}, Surname: {member.MemberSurname}, Phone: {member.MemberPhone}");
                }
            }
            else
            {
                Console.WriteLine("No members found.");
            }
        }
    }
}