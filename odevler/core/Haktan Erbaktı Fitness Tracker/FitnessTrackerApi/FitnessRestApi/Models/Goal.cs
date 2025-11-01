using System;
using FitnessRestApi.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FitnessRestApi.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        public string Title { get; set; } = null!;
        public double TargetValue { get; set; } 
        public double CurrentValue { get; set; } = 0;
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}