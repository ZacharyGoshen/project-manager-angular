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
        public JsonResult ListTasks()
        {
            var context = new Context();
            try
            {
                return Json(context.Tasks.ToList());
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
