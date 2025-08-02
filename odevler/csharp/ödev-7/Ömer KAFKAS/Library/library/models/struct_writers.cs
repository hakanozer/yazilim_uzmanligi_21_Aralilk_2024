namespace library.Models
{
    public struct Writer
    {
        public int? WritersID{ get; set; }
        public string? WritersName { get; set; }
        public string? WritersSurname { get; set; }

        public Writer(int writers_id, string writers_name, string writers_surname)
        {
            WritersID = writers_id;
            WritersName = writers_name;
            WritersSurname = writers_surname;
        }
    }
}