namespace MOnMOff
{
    class WashingMachine : Appliance
{
    public override void TurnOn()
    {
        Console.WriteLine("Washing Machine is now ON.");
    }

    public override void TurnOff()
    {
        Console.WriteLine("Washing Machine is now OFF.");
    }
}
}