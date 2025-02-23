namespace Days_18;

public class Program
{
    public static void Main(string[] args)
    {

        Action action = new Action();
        Console.WriteLine(action.a);
        int sm = action.Sum(44, 566);
        Console.WriteLine(sm);
        IAction action1 = new Action();


        User user = new User();
        int end = user.call(12);
        Console.WriteLine(end);

    }
}