namespace Cat_Dog
{
    class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
    
    // Alan hesaplama metodunun override edilmesi
    public override double CalculateArea()
    {
        return Width * Height;
    }
}
}