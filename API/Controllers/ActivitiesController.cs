using System.Collections.Generic;
using Persistence;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAtivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] // activities/id's
        public async Task<ActionResult<Activity>> GetAtivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}