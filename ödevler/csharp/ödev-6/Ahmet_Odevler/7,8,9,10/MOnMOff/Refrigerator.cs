namespace MOnMOff
{
    class Refrigerator : Appliance
{
    public override void TurnOn()
    {
        Console.WriteLine("Refrigerator is now ON.");
    }

    public override void TurnOff()
    {
        Console.WriteLine("Refrigerator is now OFF.");
    }
}
}