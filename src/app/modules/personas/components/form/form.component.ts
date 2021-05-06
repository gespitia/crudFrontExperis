import { Validation } from './../../classes/validations';
import { Planeta } from './../../../planetas/models/planeta';
import { PlanetasService } from '../../../planetas/services/planetas.service';
import { PersonasService } from './../../services/personas.service';
import { ListComponent } from './../list/list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;
  planetas: Planeta;

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    private personasService: PersonasService,
      private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public persona: any) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: [this.persona.id||0],
      name: [this.persona.name, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      surname: [this.persona.surname, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      phone: [this.persona.phone, [Validators.pattern(/^[0-9]{1,10}$/), Validators.required]],
      email: [this.persona.email, [Validators.pattern(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/), Validators.required]],
      rating: [this.persona.rating, [Validators.pattern(/^[0-9]{1,2}$/), Validators.required]],
      date_of_interview: [this.persona.date_of_interview, [Validators.pattern(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/), Validators.required]],
    });
    this.cargaCompleta = true;
  }

  onNoClick(aceptar=false): void {
    if(aceptar){
      this.dialogRef.close(this.formulario.value);
    }else{
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
  }

}
