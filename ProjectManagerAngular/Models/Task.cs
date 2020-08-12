using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagerAngular.Models
{
    public enum TaskPriority
    {
        None,
        VeryLow,
        Low,
        Medium,
        High,
        VeryHigh
    }

    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required]
        public bool Completed { get; set; }

        [Required]
        public TaskPriority Priority { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public Task()
        {
            Completed = false;
            Priority = TaskPriority.None;
        }
    }
}
