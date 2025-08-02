namespace MOnMOff
{
    class Program
{
    static void Main()
    {
        Appliance wm = new WashingMachine();
        wm.TurnOn();
        wm.TurnOff();

        Appliance fridge = new Refrigerator();
        fridge.TurnOn();
        fridge.TurnOff();


        Book book = new Book("1984", "George Orwell");
        Console.WriteLine($"Title: {book.Title}, Author: {book.Author}");

        book.Author = "Orwell";
        Console.WriteLine($"Updated Author: {book.Author}");

        IShape circle = new Circle();
        circle.Draw();

        IShape square = new Square();
        square.Draw();

        Vehicle car = new Car();
        Console.WriteLine($"Car Fuel Efficiency: {car.FuelEfficiency} km/l");

        Vehicle truck = new Truck();
        Console.WriteLine($"Truck Fuel Efficiency: {truck.FuelEfficiency} km/l");
    }
}

}