using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application;
public class EventoService : IEventoService
{
    private readonly IGeralPersist _geralPersist;
    private readonly IEventoPersist _eventoPersist;
    public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist)
    {
        this._eventoPersist = eventoPersist;
        this._geralPersist = geralPersist;

    }
    public async Task<Evento?> AddEventos(Evento model)
    {
        try
        {
            _geralPersist.Add<Evento>(model);
            if (await _geralPersist.SaveChangesAsync())
            {
                return await _eventoPersist.GetAllEventosByIdAsync(model.Id, false);
            }
            return null;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }
    public async Task<Evento?> UpdateEvento(int EventoId, Evento model)
    {
        try
        {
            var evento = await _eventoPersist.GetAllEventosByIdAsync(EventoId, false);
            if (evento == null) return null;

            model.Id = evento.Id;

            _geralPersist.Update<Evento>(model);
            if (await _geralPersist.SaveChangesAsync())
            {
                return await _eventoPersist.GetAllEventosByIdAsync(model.Id, false);
            }
            return null;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }
    public async Task<bool> DeleteEvento(int EventoId)
    {
        try
        {
            var evento = await _eventoPersist.GetAllEventosByIdAsync(EventoId, false) ?? throw new Exception("Evento não encontrado");
            _geralPersist.Delete<Evento>(evento);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento[]?> GetAllEventosAsync(bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
            if (eventos == null) return null;

            return eventos;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento?> GetAllEventosByIdAsync(int EventoId, bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosByIdAsync(EventoId, includePalestrantes);
            if (eventos == null) return null;

            return eventos;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento[]?> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
            if (eventos == null) return null;

            return eventos;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

}