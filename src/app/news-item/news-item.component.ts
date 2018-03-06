import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NewsService } from '../shared/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { News } from '../shared/news';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit, CanDeactivateGuard {
  createForm: FormGroup;
  categories = [
    { value: '', display: '--Select--' },
    { value: 'health', display: 'Health' },
    { value: 'life', display: 'Life' },
    { value: 'food', display: 'Food' }
  ];
  
  submitted: boolean = false;
  title: string = 'News creation form';
  isDisabled: boolean = false;
  isCreateMode: boolean = true;
  news: News;

  constructor(private fb: FormBuilder, private service: NewsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isDisabled = this.router.url !== '/add';
    this.isCreateMode = this.router.url === '/add';

    if (!this.isCreateMode){
      this.title = 'News view/edit form';

      this.activatedRoute.data.forEach((data: { news: News }) => {
        this.news = data.news;
      });

      this.createForm = this.fb.group({
        title: [this.news.title, Validators.required],
        category: [this.news.category, Validators.required],
        description: [this.news.description, Validators.required]
      });
    } 
    else{
      this.createForm = this.fb.group({
        title: ["", Validators.required],
        category: ["", Validators.required],
        description: ["", Validators.required]
      });
    }
  }

  onSubmit(form) {
    //console.log(form.valid);
    //console.log(form.value);
    if (this.isCreateMode) {
      this.service.createNews(form.value).subscribe(
        news => {
          this.submitted = true;
          //console.log('news => ', news);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      );
    }
    else{
      this.service.updateNews(form.value, this.news.id).subscribe(
        news => {
          this.submitted = true;
          //console.log('news => ', news);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      );
    }
   
  }

  goHome(){
    this.router.navigate(['/home']);
  }
  
  canDeactivate(): Promise<boolean> | boolean {
    if (!this.createForm.value.title && !this.createForm.value.category
      && !this.createForm.value.description || this.submitted || this.isDisabled) {
      return true;
    }

    return confirm("Your changes have not been saved. Do you really want to quit?");
  }

}
