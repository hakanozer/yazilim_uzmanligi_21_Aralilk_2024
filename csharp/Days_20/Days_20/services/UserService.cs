using Days_20.Models;
using Days_20.Utils;
using MongoDB.Bson;
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

        // yaşı 30' dan büyük ve ip adresi belirli aralıkta olan kullanıcıları listele
        public List<User> AgeIP(int minAge, string ip)
        {
            var filter = Builders<User>.Filter.Gt(u => u.Age, minAge) &
                         Builders<User>.Filter.Regex(u => u.Ip_address, new BsonRegularExpression("^" + ip + "\\."));
            var users = _userCollection.Find(filter).ToList();
            return users;
        }

        // son bir ayda kaydedilen kullanıcıları listele
        public List<User> UserDateReport()
        {
            var filter = Builders<User>.Filter.Gt(u => u.Date, DateTime.Now.AddDays(-30));
            var users = _userCollection.Find(filter)
                        .SortByDescending(u => u.Age)
                        .ToList();
            return users;
        }

        // cinsiyete göre gruplama
        public List<GenderGroup> GrupByGender()
        {
            var genderStatus = _userCollection.Aggregate()
            .Group(u => u.Gender, u => new GenderGroup
            {
                Gender = u.Key,
                Count = u.Sum(x => x.Age)
            }).ToList();

            return genderStatus;
        }


        // yaş ortalamasını hesaplama
        public double AverageAge()
        {
            var ageAverage = _userCollection.Aggregate()
            .Group(p => 1, p => new
            {
                AverageAge = p.Average(x => x.Age)
            }).FirstOrDefault();

            return Math.Round(ageAverage.AverageAge, 2);
        }

        // en yaşlı 5 kullanıcıyı listele
        public List<User> GetTop5OldestUsers()
        {
            var result = _userCollection.Find(Builders<User>.Filter.Empty)
                .SortByDescending(x => x.Age)
                .Limit(5)
                .Project(p => new User
                {
                    Id = p.Id,
                    Name = p.Name,
                    Surname = p.Surname,
                    Email = p.Email,
                    Age = p.Age,
                })
                .ToList();
            return result;
        }

        // email null yada "" olanlarını listele
        public List<User> GetEmailNullOrEmpty()
        {
            var filter = Builders<User>.Filter.Or(
                Builders<User>.Filter.Eq(u => u.Email, null),
                Builders<User>.Filter.Eq(u => u.Email, ""),
                Builders<User>.Filter.Eq(u => u.Email, " "),
                Builders<User>.Filter.Gt(u => u.Age, 20)
            );
            var users = _userCollection.Find(filter).ToList();
            return users;

        }

        // yaşı 20 ile 50 arasında olan ve ad ve soyadını getiren ve küçük harf ile yazdıran kullanıcıları listele
        public List<User> GetUsersByAgeAndName()
        {
            var result = _userCollection.Find(p => p.Age >= 20 && p.Age <= 50)
            .Project(p => new User
            {
                Name = p.Name.ToLower(),
                Surname = p.Surname.ToLower()
            })
            .ToList();
            return result;
        }

        // name ve surname alanlarının ilk harfi aynı olanlar kullanıcıları listele
        public List<User> GetUsersNameSurnameFirstCharEquals()
        {
            var result = _userCollection.AsQueryable()
                .Where(x => !string.IsNullOrEmpty(x.Name) && !string.IsNullOrEmpty(x.Surname))
                .Where(x => x.Name.ToLower().Substring(0, 1) == x.Surname.ToLower().Substring(0, 1))
                .OrderByDescending(x => x.Name)
                .ToList();
                
            return result;
        }

    }
}