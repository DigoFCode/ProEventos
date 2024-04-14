
using ProEventos.Domain;

namespace ProLotes.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// </summary>
        /// Métodos get que retornará uma lista de lotes por eventoId
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <returns>Array de Lotes</returns>
        Task<Lote[]> GetLotesbyEventoIdAsync(int eventoId);

        /// </summary>
        /// Métodos get que retornará apenas 1 Lote
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <param name="id">Código chave da tabela lote</param>
        /// <returns>Apenas um Lote</returns>
        Task<Lote> GetLoteByIdAsync(int eventoId, int id);
    }
}