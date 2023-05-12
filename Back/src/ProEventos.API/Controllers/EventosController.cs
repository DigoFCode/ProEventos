using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventosController : ControllerBase
{
        private readonly DataContext _context;
    public EventosController(DataContext context)
    {
            this._context = context;

    }

    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return _context.Eventos;
    }

    [HttpGet("{id}")]
    public Evento Get(int id) => _context.Eventos.FirstOrDefault(evento => evento.EventoId == id);

    [HttpPost]
    public string Post()
    {
        return "Exemplo de post";
    }
    
    [HttpPut("{id}")]
    public string Put(int id)
    {
        return $"Exemplo de put id = {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return $"Exemplo de delete id = {id}";
    }
}