using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence;
public class GeralPersist : IGeralPersist
{
    public ProEventosContext _context { get; }
    public GeralPersist(ProEventosContext context)
    {
        this._context = context;

    }
    public void Add<T>(T etity) where T : class
    {
        _context.Add(etity);
    }
    public void Update<T>(T etity) where T : class
    {
        _context.Update(etity);
    }
    public void Delete<T>(T etity) where T : class
    {
        _context.Remove(etity);
    }

    public void DeleteRange<T>(T[] etityArray) where T : class
    {
        _context.RemoveRange(etityArray);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return (await _context.SaveChangesAsync()) > 0;
    }

}