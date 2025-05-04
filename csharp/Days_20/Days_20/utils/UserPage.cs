using Days_20.Models;

namespace Days_20.Utils
{
    public class UserPage
    {
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }
        public List<User> Users { get; set; }
    }
}