﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectManagerAngular.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters")]
        public string Name { get; set; }

        [Required]
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public List<Task> Tasks { get; set; }
    }
}
