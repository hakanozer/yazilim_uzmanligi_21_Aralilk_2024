using Days_13.users;

namespace Days_13
{
    public class Program
    {
        public static void Main(string[] args)
        {

            User user = new User();
            Customer customer = new Customer();
            Admin admin = new Admin();

            Console.WriteLine($"user -> {user.GetHashCode()}");
            Console.WriteLine($"customer -> {customer.GetHashCode()}");
            Console.WriteLine($"admin -> {admin.GetHashCode()}");

            call(user, "a", "a");
            call(customer, "c", "c");
            call(admin, "e", "e");
            /*
            bool userStatus = user.Login("a", "a");
            Console.WriteLine($"userStatus: {userStatus} - name: {user.nameSurname}");

            bool customerStatus = customer.Login("c", "c");
            Console.WriteLine($"customerStatus: {customerStatus} - name: {customer.nameSurname}");

            bool adminStatus = admin.Login("e", "e");
            Console.WriteLine($"adminStatus: {adminStatus} - name: {admin.nameSurname}");
            */
        }

        public static void call( Person person, string username, string password )
        {
            bool status = person.Login(username, password);
            Console.WriteLine($"Login Status: {status} - Name: {person.nameSurname}");
            if ( person is Customer )
            {
                // person türünü Customer türüne dönüştür.
                Customer c = (Customer) person;
                c.AddBasket(100);
                Console.WriteLine($"c -> {c.GetHashCode()}");
            }
        }
    }
}
