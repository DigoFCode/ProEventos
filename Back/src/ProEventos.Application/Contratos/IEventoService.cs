using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos;
public interface IEventoService
{
    Task<EventoDto> AddEventos(EventoDto model);
    Task<EventoDto> UpdateEvento(int EventoId, EventoDto model);
    Task<bool> DeleteEvento(int EventoId);

    Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false);
    Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
    Task<EventoDto> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes = false);
}