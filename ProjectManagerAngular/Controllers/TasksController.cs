using System;
using System.Collections.Generic;
using System.Linq;
using ProjectManagerAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace ProjectManagerAngular.Controllers
{
    public class TasksController : Controller
    {
        [HttpGet]
        [Route("tasks")]
        public JsonResult GetTasksInCategory()
        {
            var categoryId = HttpContext.Request.Query["categoryId"].ToString();
            if (categoryId == "")
            {
                throw new Exception();
            }

            var context = new Context();
            try
            {
                return Json(context.Tasks.Where(task => task.CategoryId == Int32.Parse(categoryId)));
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        [Route("tasks")]
        public JsonResult AddTask([FromBody] Task task)
        {
            if (!ModelState.IsValid)
            {
                throw new Exception();
            }

            var context = new Context();
            try
            {
                context.Tasks.Add(task);
                context.SaveChanges();
                return Json(task);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("tasks/{id}")]
        public JsonResult DeleteTask(int id)
        {
            var context = new Context();
            try
            {
                var task = context.Tasks.Find(id);
                context.Tasks.Attach(task);
                context.Tasks.Remove(task);
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
