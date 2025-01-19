using System;
namespace Days_9.models
{
	public struct User
	{
		public string name;
		public string surname;
		public int age;

		public string allData()
		{
			return $"{name} - {surname} - {age}";
		}

        // override
        // defaultta var olan bir fonksiyonun ezilmesi - değiştirilmesi
        public override string ToString()
        {
			return $"{name} - {surname} - {age}";
        }

    }
}

