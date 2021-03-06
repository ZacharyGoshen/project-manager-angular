﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerAngular.Models;

namespace ProjectManagerAngular.Controllers
{
    public class CategoriesController : Controller
    {
        [HttpGet]
        [Route("categories")]
        public JsonResult GetCategoriesInProject()
        {
            var projectId = HttpContext.Request.Query["projectId"].ToString();
            if (projectId == "") {
                throw new Exception();
            }

            var context = new Context();
            try
            {
                var categories = context.Categories
                    .Where(c => c.ProjectId == Int32.Parse(projectId));
                return Json(categories);
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        [Route("categories")]
        public JsonResult AddCategory([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return Json(category);
            }

            var context = new Context();
            try
            {
                context.Categories.Add(category);
                context.SaveChanges();
                return Json(category);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut]
        [Route("categories")]
        public JsonResult UpdateCategory([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return Json(category);
            }

            var context = new Context();
            try
            {
                context.Entry(context.Categories.Find(category.Id)).CurrentValues.SetValues(category);
                context.SaveChanges();
                return Json(category);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("categories/{id}")]
        public JsonResult DeleteCategory(int id)
        {
            var context = new Context();
            try
            {
                var category = context.Categories.Find(id);
                context.Categories.Attach(category);
                context.Categories.Remove(category);
                context.SaveChanges();
                return Json(id);
            }
            catch
            {
                throw;
            }
        }
    }
}
