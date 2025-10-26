using Microsoft.AspNetCore.Mvc;
using System;
using AutoMapper;
using RestApi.Utils;
using RestApi.Dto.ServiceDto;
using RestApi.Models;

namespace RestApi.Services
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public CategoryService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Service? ServiceAdd(ServiceAddDto serviceAddDto)
        {
            var Service = _mapper.Map<Service>(serviceAddDto);
            var ServiceDb = _dbContext.Services.FirstOrDefault(item => item.Name == serviceAddDto.Name);
            if (ServiceDb == null)
            {
                _dbContext.Add(Service);
                _dbContext.SaveChanges();
                return Service;
            }
            return null;
        }

    }
}