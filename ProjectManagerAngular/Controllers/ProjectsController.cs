using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectManagerAngular.Models;

namespace ProjectManagerAngular.Controllers
{
    public class ProjectsController : Controller
    {
        [HttpGet]
        [Route("projects")]
        public JsonResult GetFirstProject()
        {
            var context = new Context();
            try
            {
                return Json(context.Projects.First());
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        [Route("projects")]
        public JsonResult AddProject([FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return Json(project);
            }

            var context = new Context();
            try
            {
                context.Projects.Add(project);
                context.SaveChanges();
                return Json(project);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut]
        [Route("projects")]
        public JsonResult UpdateProject([FromBody] Project project)
        {
            if (!ModelState.IsValid)
            {
                return Json(project);
            }

            var context = new Context();
            try
            {
                context.Entry(context.Projects.Find(project.Id)).CurrentValues.SetValues(project);
                context.SaveChanges();
                return Json(project);
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete]
        [Route("projects/{id}")]
        public JsonResult DeleteProject(int id)
        {
            var context = new Context();
            try
            {
                var project = context.Projects.Find(id);
                context.Projects.Attach(project);
                context.Projects.Remove(project);
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
