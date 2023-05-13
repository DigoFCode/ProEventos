using ProEventos.Domain;

namespace ProEventos.Application.Contratos;
public interface IEventoService
{
    Task<Evento> AddEventos(Evento model);
    Task<Evento> UpdateEvento(int EventoId, Evento model);
    Task<bool> DeleteEvento(int EventoId);

    Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false);
    Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
    Task<Evento> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes = false);
}