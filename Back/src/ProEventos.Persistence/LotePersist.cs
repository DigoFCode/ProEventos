using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProLotes.Persistence.Contratos;

namespace ProEventos.Persistence;

public class LotePersist : ILotePersist
{
    private readonly ProEventosContext _context;
    public LotePersist(ProEventosContext context)
    {
        _context = context;
    }

    public async Task<Lote?> GetLoteByIdAsync(int eventoId, int id)
    {
        IQueryable<Lote> query = _context.Lotes;
        query = query.AsNoTracking()
                     .Where(l => l.EventoId == eventoId && l.Id == id);

        return await query.FirstOrDefaultAsync();
    }

    public async Task<Lote[]> GetLotesbyEventoIdAsync(int eventoId)
    {
        IQueryable<Lote> query = _context.Lotes;
        query = query.AsNoTracking()
                     .Where(l => l.EventoId == eventoId);

        return await query.ToArrayAsync();
    }
}
