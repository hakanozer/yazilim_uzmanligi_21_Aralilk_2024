namespace Days_19.Models
{
    public struct CityContact
    {
        public int? Cid { get; set; }
        public int? Tid { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? SehirAdi { get; set; }
        public float? Yuzolcumu { get; set; }
        public string? Bolge { get; set; }
        public int? Nufus { get; set; }

        public CityContact(int cid, int tid, string name, string surname, string email, string phone, string sehirAdi, float yuzolcumu, string bolge, int nufus)
        {
            Cid = cid;
            Tid = tid;
            Name = name;
            Surname = surname;
            Email = email;
            Phone = phone;
            SehirAdi = sehirAdi;
            Yuzolcumu = yuzolcumu;
            Bolge = bolge;
            Nufus = nufus;
        }
    }
}