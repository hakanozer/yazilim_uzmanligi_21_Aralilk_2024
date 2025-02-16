namespace Days_17
{
    public class Program
    {
        public static void Main()
        {
            // ArrayList
            // Türü object olduğundan her türlü ve karışık türdeki verileri
            // alabilen ve tür ataması olmayan bir yapıdadır.


            // List<T>
            // Generic yoluyla tür ataması olduğundan kesin bir tür alır,
            // böylelikle bu collection hangi tür için çalışması gerektiğini bilir.

            // LinkedList<T>
            // Collections'nun ortalarına yada farklı indexlerine değer eklemek
            // için kullanılır.

            // Queue<T>
            // İstenilen veri türü ile işlem yapar
            // fifo - ilk giren ilk çıkar

            // Stack<T>
            // İstenilen veri türü ile işlem yapar
            // lifo -> son giren ilk çıkar
            // sondan başa doğru bir sıralama

            // HashSet<T>
            // sıralama algoritması eklenen değerin bellekteki hashcode
            // büyüklüğüne göre yapılır.
            // benzersiz değerleri kendisinde saklar.

            UseLinkedList useLinkedList = new UseLinkedList();
            useLinkedList.Call();

            Console.WriteLine("============================");
            UseQueue useQueue = new UseQueue();
            useQueue.Call();

            Console.WriteLine("============================");
            UseStack useStack = new UseStack();
            useStack.Call();

            Console.WriteLine("============================");
            UseHashSet useHashSet = new UseHashSet();
            useHashSet.Call();

        }
    }
}