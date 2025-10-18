
using System;
using RestApi.Models;
using RestApi.Utils;

namespace RestApi.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _dbContext;
        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        
    
    }
}