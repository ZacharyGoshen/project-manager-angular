using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProjectManagerAngular.Controllers
{
    public class TaskController : Controller
    {
        [HttpGet]
        [Route("tasks")]
        public JsonResult Get()
        {
            var context = new Context();
            var tasks = context.Tasks.ToList();
            return Json(tasks);
        }

    }
}
