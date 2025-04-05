namespace Days_19
{
    public class ContactService
    {
        DB _dB = null;
        public ContactService()
        {
            _dB = new DB();
        }

        public int AddContact(Contact contact) {
            int result = 0;
            try
            {
               
            }catch (SqlException ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _dB.CloseConnection();
            }
            return result;
        }


    }
}