import { Lote } from './../../../models/Lote';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EventoService } from '@app/services/evento.service';
import { LoteService } from '../../../services/lote.service';
import { Evento } from '@app/models/Evento';

import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  loteAtual: { id: number; nome: string; index: number } = {
    id: 0,
    nome: '',
    index: 0,
  };
  modalRef: BsModalRef;
  eventoId: number;
  evento = {} as Evento;
  form: FormGroup;
  estadoSalvar = 'post';
  imagemUrl = 'assets/upload.jpeg';
  public file: File | null = null;

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }
  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      minDate: new Date(),
      isanimate: true,
    };
  }
  get bsConfigLote(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      minDate: new Date(),
      isanimate: true,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private LoteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);
          if (this.evento.imagemURL !== '') {
            this.imagemUrl =
              environment.apiUrl + 'resources/images/' + this.evento.imagemURL;
          }
          this.evento.lotes.forEach((lote) => {
            this.lotes.push(this.criarLote(lote));
          });
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide()
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    (this.form.get('lotes') as FormArray).push(
      this.criarLote({ id: 0 } as Lote)
    );
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required],
    });
  }

  public mudarValorData(value: Data, campo: string, indice: number): void {
    this.lotes.value[indice][campo] = value;
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }
  public salvarLotes(): void {
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();
      this.LoteService.saveLote(this.eventoId, this.form.get('lotes').value)
        .pipe(
          tap(() => {
            this.toastr.success('Lotes salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`eventos/detalhe/${this.eventoId}`]);
          }),
          catchError((error: any) => {
            console.error(error);
            this.toastr.error('Error ao salvar lotes', 'Erro');
            return EMPTY;
          }),
          finalize(() => this.spinner.hide())
        )
        .subscribe();
    }
  }
  public removerLote(template: TemplateRef<any>, index: number): void {
    this.loteAtual.id = this.lotes.get([index]).get('id').value;
    this.loteAtual.nome = this.lotes.get([index]).get('nome').value;
    this.loteAtual.index = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.LoteService.deleteLote(this.eventoId, this.loteAtual.id)
      .pipe(
        tap(() => {
          this.lotes.removeAt(this.loteAtual.index);
          this.toastr.success('Lote deletado com Sucesso!', 'Sucesso');
        }),
        catchError((error: any) => {
          this.toastr.error(
            `Erro ao tentar deletar o Lote ${this.loteAtual.id}`,
            'Erro'
          );
          console.error(error);
          return EMPTY;
        }),
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }
  public declineDeleteLote(): void {
    this.modalRef.hide();
  }
  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }
  public onFileChange(ev: Event): void {
    const reader = new FileReader();
    const inputElement = ev.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      reader.onload = (event: any) => (this.imagemUrl = event.target.result);
      reader.readAsDataURL(this.file);
      this.uploadImagem();
    }
  }
  uploadImagem(): void {
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com Sucesso!', 'Sucesso');
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar fazer upload da imagem.', 'Erro!');
        console.log(error);
      },
      () => this.spinner.hide()
    );
  }
}
