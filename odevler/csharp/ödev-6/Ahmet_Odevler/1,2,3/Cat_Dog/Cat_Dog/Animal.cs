namespace Cat_Dog
{
    abstract class Animal
    {
        public abstract void MakeSound();  

        public void ShowMessage()  
        {
            Console.WriteLine("This is an animal.");
        }
    }
}