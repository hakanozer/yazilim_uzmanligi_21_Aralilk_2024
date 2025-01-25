using System;
namespace Days_10
{
	public class DB
	{
		Edb edb;

		public DB()
		{
			edb = Edb.MSSQL;
		}

		public DB(Edb edb)
		{
			this.edb = edb;
		}


		public void connect()
		{
			if (edb == Edb.MYSQL)
			{
				Console.WriteLine("mysql connect");
			}else if (edb == Edb.MSSQL)
            {
				Console.WriteLine("mssql connect");
			}else if (edb == Edb.SQLITE)
            {
				Console.WriteLine("sqlite connect");
			}
		}

		public void close()
		{
            if (edb == Edb.MYSQL)
            {
                Console.WriteLine("mysql close");
            }
            else if (edb == Edb.MSSQL)
            {
                Console.WriteLine("mssql close");
            }
            else if (edb == Edb.SQLITE)
            {
                Console.WriteLine("sqlite close");
            }
        }

	}
}

