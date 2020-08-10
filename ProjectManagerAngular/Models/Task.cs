using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagerAngular.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
