namespace Tekrar_4
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // A objA = new A();
            // Console.WriteLine( objA.Call1() );
            // Console.WriteLine( objA.Call2() );

            //B objB = new B();
            //Console.WriteLine(objB.City());
            //Console.WriteLine(objB.NumberPlate());

            B b = new B();
            Console.WriteLine(b.Call1());
            Console.WriteLine(b.Call2());
            Console.WriteLine(b.City());
            Console.WriteLine(b.NumberPlate());

        }
    }
}