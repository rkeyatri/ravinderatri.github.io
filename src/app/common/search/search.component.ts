import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services';
import { SlideAnimation } from '../../helpers/animation.slide';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    loading = false;

  @Output() searchSubmit = new EventEmitter(); 

  searchForm: FormGroup; 
  constructor (
      private router: Router,
      private ds: DataService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
  ) { }

  ngOnInit() {
      this.searchForm = this.fb.group({
          mode: '',
          product: '',            
          hscode: '', 
          port: '',
          country: '',
          exporter: '',
          importer: '',
          unit: '', 
      });

      const urlParams = combineLatest(
          this.route.params,
          this.route.queryParams,
          (params, queryParams) => ({ ...params, ...queryParams})
      );

      urlParams.subscribe(routeParams => {
          routeParams.mode = this.route.snapshot.routeConfig.path;
          this.searchForm.patchValue(routeParams);
      });
  }
  get form() { return this.searchForm.controls; } 
  onDataSearch(form: FormGroup) {
    this.loading = true;
      this.searchSubmit.emit(this.searchForm);
  }
}


