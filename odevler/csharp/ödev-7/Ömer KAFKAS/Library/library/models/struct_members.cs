namespace library.Models
{
    public struct Member
    {
        public int MemberID { get; set; }
        public string MemberName { get; set; }
        public string MemberSurname { get; set; }
        public string MemberEmail { get; set; }
        public string MemberPhone { get; set; }

        public Member(int member_id, string member_name, string member_surname, string member_email, string member_phone)
        {
            MemberID = member_id;
            MemberName = member_name;
            MemberSurname = member_surname;
            MemberEmail = member_email;
            MemberPhone = member_phone;
        }
    }
}