using Days_20.Models;
using Days_20.Utils;
using MongoDB.Driver;

namespace Days_20.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;
        public UserService()
        {
            DBMongo dbMongo = new();
            _userCollection = dbMongo.GetCollection<User>("users");
        }

        /*
            17
            5
            4
            1.2.3.4
        */

        // sayfalama
        public UserPage GetAllUsersPage(int pageSize, int pageNumber)
        {
            var filter = Builders<User>.Filter.Empty;
            var totalCount = _userCollection.CountDocuments(filter);
            var totalPage = (int)Math.Ceiling((double)totalCount / pageSize);
            
            var users = _userCollection.Find(filter)
                .Skip(pageSize * (pageNumber - 1))
                .Limit(pageSize)
                .SortByDescending(x => x.Age)
                .ToList();

            UserPage userPage = new()
            {
                TotalCount = (int)totalCount,
                TotalPage = totalPage,
                Users = users
            };
            return userPage;
        }
        


    }
}