import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Import, MetaData} from '../models';
import { map } from 'rxjs/operators';

@Injectable()

export class DataService {
    constructor (
        private api: ApiService
    ) {}

    sanitizedParams(params: object){
        const formParams = {};
        Object.entries(params).forEach(
            ([key, value]) => {
                if (value !== '') {
                    formParams[key] = value;
                }
            }
        )
        return formParams;
    }
   
    getImportData(params: object): Observable<{imports: Import[], meta: MetaData}> {
        return this.api.get('USA/GetShipment', this.sanitizedParams(params)).pipe(map(
            data => {
                return {
                    imports: data.usaModels,
                    meta: {
                        total: data.total,
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize
                    }
                };
            }
        ));
    }
   
   
}
