using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{
    public IEnumerable<Evento> _evento = new Evento[]{
            new Evento(){
            EventoId = 1,
            Tema = "Angular 11 e .NET 6",
            Local = "Belo Horizonte",
            Lote = "1º Lote",
            QtdPessoas = 250,
            DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
            ImagemURL = "foto.png"
            },
            new Evento(){
            EventoId = 2,
            Tema = "Angular e susas novidsades",
            Local = "São Paulo",
            Lote = "2º Lote",
            QtdPessoas = 350,
            DataEvento = DateTime.Now.AddDays(5).ToString("dd/MM/yyyy"),
            ImagemURL = "foto.png"
            }
        };
    public EventoController()
    {

    }

    [HttpGet]
    public IEnumerable<Evento> Get()
    {
        return _evento;
    }

    [HttpGet("{id}")]
    public IEnumerable<Evento> Get(int id)
    {
        return _evento.Where(evento => evento.EventoId == id);
    }

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
