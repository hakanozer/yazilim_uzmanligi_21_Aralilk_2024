﻿using System;
namespace Days_16.models
{
	public struct Product
	{

		public string title;
		public string detail;
		public int price;
		public bool status;

        public override string ToString()
        {
			return $"{title} - {detail} - {price} - {status}";
        }

    }
}

