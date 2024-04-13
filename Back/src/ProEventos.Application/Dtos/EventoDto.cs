using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "O campo local é obrigatório")]
        public string Local { get; set; }
        [Required(ErrorMessage = "O campo data é obrigatório"),
        DataType(DataType.DateTime),
        DisplayFormat(DataFormatString = "{0:yyyy-MM-dd HH:mm}")]
        public string DataEvento { get; set; }
        [Required(ErrorMessage = "O {0} deve ser preenchido"),
        StringLength(50, MinimumLength = 3, ErrorMessage = "O {0} deve ter entre {2} e {1} caracteres")]
        public string Tema { get; set; }
        [Display(Name = "Qtd. Pessoas"),
        Range(1, 120000, ErrorMessage = "Quantidade de pessoas deve ser entre 1 e 120000")]
        public int QtdPessoas { get; set; }
        [Display(Name = "Imagem do Evento"),
        RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida (gif, jpg, jpeg, bmp ou png)"),
        StringLength(300, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Display(Name = "Telefone"),
        Phone(ErrorMessage = "Telefone inválido")]
        public string Telefone { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório"),
        Display(Name = "e-mail"),
        EmailAddress(ErrorMessage = "Email inválido"),
        DataType(DataType.EmailAddress),
        StringLength(100, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string Email { get; set; }
        public IEnumerable<LoteDto>? Lotes { get; set; }
        public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
        public IEnumerable<PalestranteDto>? Palestrantes { get; set; }
    }
}