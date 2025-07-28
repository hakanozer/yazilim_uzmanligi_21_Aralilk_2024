namespace Cat_Dog
{
    class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius)
    {
        Radius = radius;
    }
    
    // Alan hesaplama metodunun override edilmesi
    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}
}