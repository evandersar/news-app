import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NewsService } from '../shared/news.service';
import { Router } from '@angular/router';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit, CanDeactivateGuard {
  createForm: FormGroup;
  categories = [
    { value: '', display: '--Select--' },
    { value: 'health', display: 'Health' },
    { value: 'life', display: 'Life' },
    { value: 'food', display: 'Food' }
  ];
  public submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: NewsService, private router: Router) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  onSubmit(form) {
    //console.log(form.valid);
    //console.log(form.value);
    this.service.serverCreate(form.value).subscribe(
      news => {
        this.submitted = true;
        //console.log('news => ', news);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    );
  }

  goHome(){
    this.router.navigate(['/home']);
  }
  // метод для проверки возможности перенаправления пользователя на другой маршрут
  // если метод возвращает true перенаправление возможно
  // если метод вернет false пользователь получит уведомление с просьбой подтвердить переход
  // Данный метод будет использоваться при работе с CanDeactivateGuard (shared/can-deactivate-guard.service.ts)
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.createForm.value.title && !this.createForm.value.category
      && !this.createForm.value.description || this.submitted) {
      return true;
    }

    return confirm("Your changes have not been saved. Do you really want to quit?");
  }

}
