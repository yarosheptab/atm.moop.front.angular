import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

constructor() { }

    toUrlEncoded(obj: Record<string, string | number | boolean>): string {
        let str = [];
        for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
}
