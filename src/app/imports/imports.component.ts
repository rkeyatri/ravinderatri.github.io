import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService, AlertService } from '../services';
import { Import, MetaData, GraphModel } from '../models';
import { IMPORT_COLS } from '../helpers/import.columns';

@Component({
    selector: 'app-imports',
    templateUrl: './imports.component.html',
    styleUrls: ['./imports.component.scss']
})
export class ImportsComponent implements OnInit {
  gridApi:any;
  columnApi:any;  
  defaultColDef = {
    sortable: true,
    filter: true
    
};
  columnDefs = [
    {headerName:'Date', field: 'date', sortable: true, filter: true, pivot: true, },
    { headerName:'Consignee Name', field: 'consignee_Name',sortable: true, filter: true,pivot: true},
    {headerName:'Shipper Name', field: 'shipper_Name',sortable: true, filter: true, pivot: true},
    {headerName:'Country', "pinned":"left", field: 'country', sortable: true, filter: true,pivot: true},
    {headerName:'Hs Code', field: 'hS_Code' ,sortable: true, filter: true,pivot: true},
    {headerName:'Unloading Port', field: 'unloading_Port',sortable: true, filter: true,pivot: true}, 
    {headerName:'Product Description', field: 'product_Description',sortable: true, filter: true, pivot: true},    
];
autoGroupColumnDef = {
  headerName: 'Model',
  field: 'model',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
      checkbox: true
  }
};
// rowData:any = [
//     { date: '',},
//     { date: String, model: 'Mondeo', price: 32000 },
//     // { make: String, model: 'Boxter', price: 72000 }
// ];
    importKeys = IMPORT_COLS;
    params: object;
    shipments: Import[];
    rowData:Import[];
    meta: MetaData;
    graphdata: GraphModel;
    compaeData: [];
    shipmentFilters = [];
    pageIndex = 1;
    pageSize = 20;
    viewPort = [1270, 550];
    viewPiePort = [1200, 500];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private ds: DataService
    ) {


    
     }

    ngOnInit() {
        const urlParams = combineLatest(
            this.route.params,
            this.route.queryParams,
            (params, queryParams) => ({ ...params, ...queryParams})
        );

        urlParams.subscribe(routeParams => {
            this.params = routeParams;
            this.params['mode'] = 'import';
            
                this.searchData(this.params, true);
            
        });
    }
    onSearchSubmit(form: any){
        const searchFormData = form.value;
       
        if(searchFormData.mode === 'imports') {
            this.router.navigate(['/imports'], { queryParams: this.getFormParams(searchFormData)});
        }
    }
    getFormParams(formData: object){
        const formParams = {};
        Object.entries(formData).forEach(
            ([key, value]) => {
                if (value !== '' && key !== 'mode') {
                    formParams[key] = value;
                }
            }
        );
        return formParams;
    }
    onSwitchTab(tab: any) {
        if (tab.for === 'charts') {
            this.ds.getImportCharts(this.params)
            .pipe(
                map(
                    data =>  data[0]
                )
            )
            .subscribe(
                (data) => {
                    this.graphdata = data;
                }
            );
        }
        if(tab.for === 'comparision'){
            /*
            this.compaeData = [
                {
                  "name": "Montenegro",
                  "series": [
                    {
                      "value": 4501,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 2032,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 6929,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 3650,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 4792,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Cambodia",
                  "series": [
                    {
                      "value": 5993,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4032,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 6724,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 5023,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 5763,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Bahamas",
                  "series": [
                    {
                      "value": 6671,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 3895,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 2223,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 4317,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 3959,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "French Southern Territories",
                  "series": [
                    {
                      "value": 5375,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4933,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 2171,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 6742,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 6318,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Estonia",
                  "series": [
                    {
                      "value": 4523,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4272,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 5032,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 2783,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 4880,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                }
              ];
              */
            this.ds.getImportComparision(this.params)
            .subscribe(
                (data) => {
                    this.compaeData = data;
                }
            );
        }
    }
    searchData(params: object, updateFilter?: boolean) {
        params['pageIndex'] = this.pageIndex;
        params['pageSize'] = this.pageSize;
        this.ds.getImportData(params)
            .subscribe(
                ({ imports, meta }) => {
                    if (imports != null) {
                        this.shipments = imports;
                         this.rowData=imports;
                         
                        this.meta = meta;
                    } else {
                        this.alertService.error('No records found');
                    }
                    window.scroll(0, 320);
                },
            error => {
                this.shipments = null;
                this.meta = null;
                this.alertService.error(error.statusText);
            }
        );
        if(updateFilter) {
            this.ds.getImportFilters(params)
            .pipe(map(data => data[0]))
            .subscribe(
                data => {
                    this.shipmentFilters = data;
                }
            )
        }
    }
    filterData(key: string, value: any) {
        // this.params[key] = value;
        // this.pageIndex = 1;
        // this.searchData(this.params, true);
        const qParams: object = {};
        qParams[key] = value;
        this.router.navigate([], { queryParams: qParams, queryParamsHandling: 'merge' });
    }
    goToPage(n: number): void {
        this.pageIndex = n;
        this.searchData(this.params);
    }
    onNext(): void {
        this.pageIndex++;
        this.searchData(this.params);
    }
    onPrev(): void {
        this.pageIndex--;
        this.searchData(this.params);
    }
    onResize(event) {
        const width = event.target.innerWidth;
        this.viewPort = [width - 110, 550];
        this.viewPiePort = [width - 120, 550];
    }
}
export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "1990",
        "value": 62000000
      },
      {
        "name": "2010",
        "value": 73000000
      },
      {
        "name": "2011",
        "value": 89400000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "1990",
        "value": 250000000
      },
      {
        "name": "2010",
        "value": 309000000
      },
      {
        "name": "2011",
        "value": 311000000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "1990",
        "value": 58000000
      },
      {
        "name": "2010",
        "value": 50000020
      },
      {
        "name": "2011",
        "value": 58000000
      }
    ]
  },
  {
    "name": "UK",
    "series": [
      {
        "name": "1990",
        "value": 57000000
      },
      {
        "name": "2010",
        "value": 62000000
      }
    ]
  }
];