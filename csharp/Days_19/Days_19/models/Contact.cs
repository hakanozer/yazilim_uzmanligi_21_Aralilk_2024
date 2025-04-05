namespace Days_19.Models
{
    public struct Contact
    {
        public int Cid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public Contact() {
            
        }

        public Contact(int cid, string name, string surname, string email, string phone, string address)
        {
            Cid = cid;
            Name = name;
            Surname = surname;
            Email = email;
            Phone = phone;
            Address = address;
        }
        
    }
}