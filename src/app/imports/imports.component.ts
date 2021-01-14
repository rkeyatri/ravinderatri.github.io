import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../services';
import { Import, MetaData,} from '../models'; 

@Component({
    selector: 'app-imports',
    templateUrl: './imports.component.html',
    styleUrls: ['./imports.component.scss']
})
export class ImportsComponent implements OnInit {
  gridApi:any;
  agGrid:any;
  columnApi:any;  
  rowSelection:any; 
  defaultColDef = {
    sortable: true,
    filter: true    
};
 
colDef = [   
    {headerName:'Consignee Name', field: 'consignee_Name', sortable: true,  filter: true, },
    {headerName:'Shipper Name', field: 'shipper_Name', sortable: true, filter: true,   },
    {headerName:'Country', "pinned":"left", field: 'country',  headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, sortable: true, filter: true, },
    {headerName:'Hs Code', field: 'hS_Code' ,sortable: true, filter: true,   },
    {headerName:'Loading Port', field: 'loading_Port' ,sortable: true, filter: true,   },     
    {headerName:'Unloading Port', field: 'unloading_Port',sortable: true, filter: true,    }, 
    {headerName:'Product Description', field: 'product_Description', sortable: true, filter: true,  }, 
    {headerName:'Date', field: 'date', sortable: true, filter: true,  sideBar:true },   
];

autoGroupColumnDef = {
    headerName: 'Country',
    field: 'country',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: false
    }
}; 
  
    params: object;
    shipments: Import[];
    rowData:Import[];
    meta: MetaData; 
    pageIndex = 1;
    pageSize = 20;
    viewPort = [1270, 550];
    viewPiePort = [1200, 500];
    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private ds: DataService
    ) {
        
        this.rowSelection = 'multiple';

      this.defaultColDef = {       
      flex:1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
    }; 
    
     }
    
    
     getSelectedRows() {
        const selectedNodes = this.colDef;
        const selectedData = selectedNodes.map(node => node.data );
        const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');

        alert(`Selected nodes: ${selectedDataStringPresentation}`);
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
 
    loading = false;
    onSearchSubmit(form: any){
        this.loading = true;
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
                        alert('No records found');
                    }
                    window.scroll(0, 320);
                },
            error => {
                this.shipments = null;
                this.meta = null;
                alert('No records found')
            }
        );
       
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
    
   
    //   function rowGroupCallback(params) {
    //     return params.node.key;
    //   }
    //   function getIndentClass(params) {
    //     var indent = 0;
    //     var node = params.node;
    //     while (node && node.parent) {
    //       indent++;
    //       node = node.parent;
    //     }
    //     return ['indent-' + indent];
    //   }

}

