using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;
public class PalestrantePersist : IPalestrantePersist
{
    public ProEventosContext _context { get; }
    public PalestrantePersist(ProEventosContext context)
    {
        this._context = context;

    }
    public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos)
    {
        IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

        if (includeEventos)
        {
            query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.AsNoTracking().OrderBy(p => p.Id);
        return await query.ToArrayAsync();
    }

    public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos)
    {
        IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

        if (includeEventos)
        {
            query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Nome.ToLower().Contains(Nome.ToLower()));
        return await query.ToArrayAsync();
    }

    public async Task<Palestrante> GetAllPalestrantesByIdAsync(int PalestranteId, bool includeEventos)
    {
        IQueryable<Palestrante> query = _context.Palestrantes.Include(p => p.RedesSociais);

        if (includeEventos)
        {
            query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);
        }

        query = query.AsNoTracking().OrderBy(p => p.Id).Where(p => p.Id == PalestranteId);
        return await query.FirstOrDefaultAsync();
    }

}