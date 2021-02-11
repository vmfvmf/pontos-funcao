import { AppSharedService } from './../../app-shared.service';
import { MessageService } from './../../shared/message-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintsService } from './../sprints.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Sprint } from '../sprint';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Ded } from 'src/app/deds/ded';

@Component({
  selector: 'app-sprints-cadastro',
  templateUrl: './sprints-cadastro.component.html',
  styleUrls: ['./sprints-cadastro.component.css'],
})
export class SprintsCadastroComponent implements OnInit {
  sprint: Sprint;
  constructor(
    public dialogRef: MatDialogRef<SprintsCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {sprint: Sprint, ded: Ded}) {
      this.sprint = data.sprint;
      this.sprint.ded = {id: data.ded.id };
    }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
