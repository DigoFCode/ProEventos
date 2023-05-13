using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos;
public interface IGeralPersist
{
    void Add<T>(T etity) where T : class;
    void Update<T>(T etity) where T : class;
    void Delete<T>(T etity) where T : class;
    void DeleteRange<T>(T[] etityArray) where T : class;

    Task<bool> SaveChangesAsync();
}