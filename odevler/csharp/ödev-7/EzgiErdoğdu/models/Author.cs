namespace LibraryManagementSystem.Models
{
    public struct Author
    {
        public int Aid { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public Author(){
            
        }

        

        public Author(int aid, string name, string surname)
        {
            Aid = aid;
            Name = name;
            Surname = surname;
        }
    }
}
