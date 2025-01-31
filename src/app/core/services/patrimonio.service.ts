import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Patrimonio } from '../models/patrimonio.model';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { PatrimonioSearchParams } from '../resolvers/patrimonio.resolver';
import { Platform } from '@ionic/angular';
import { HttpWrapperService } from './http-wrapper.service';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class PatrimonioService {
    constructor(
      private http: HttpClient,
      @Inject('patrimonioUrl') private patrimonioUrl: string,
      private platform: Platform,
      private httpWrapper: HttpWrapperService
    ) {}
  

    getPatrimonioData(params: PatrimonioSearchParams): Observable<any> {
          let httpParams = new HttpParams()
            .set('pagina', (params.pagina || 0).toString());
  
          if (params.comune) {
            httpParams = httpParams.set('comune', params.comune);
          }
          if (params.indirizzo) {
            httpParams = httpParams.set('indirizzo', params.indirizzo);
          }
          if(params.statoDisponibilita){
            httpParams = httpParams.set('statoDisponibilita', params.statoDisponibilita);
          }

  
          if (this.platform.is('hybrid')) {
            const options = {
              url: this.patrimonioUrl,
              method: 'GET',
              params: this.convertParams(httpParams)
            };
  
            return from(this.httpWrapper.capacitorHttpRequest(options,false));
          } else {
            return this.http.get<Patrimonio[]>(this.patrimonioUrl, {
              params: httpParams,
              observe: 'response'
            }).pipe(
              catchError(error => { throw error; })
            );
          }
    }  

  getPatrimonioById(id: string){
    if (this.platform.is('hybrid')) {
      const options = {
        url: `${this.patrimonioUrl}/${id}`,
        method: 'GET'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options,false));
    } else {
    return this.http.get<Patrimonio>(`${this.patrimonioUrl}/${id}`).pipe(
      catchError(e => { throw (e) }));
    }
  }


   
  async addPatrimonio(patrimonioData: Patrimonio, updatedDocumentiFiles: any[]): Promise<any>  {
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
      let body = '';
    
      // UnitaImmobiliare 
      body += `--${boundary}\r\n`;
      body += 'Content-Disposition: form-data; name="unitaImmobiliare"; filename="patrimonio.json"\r\n';
      body += 'Content-Type: application/json\r\n\r\n';
      body += JSON.stringify(patrimonioData) + '\r\n';
    
      if (this.platform.is('hybrid') && updatedDocumentiFiles?.length) {
        for (const file of updatedDocumentiFiles) {
          try {
  
            const byteString = atob(file.data);
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
              uint8Array[i] = byteString.charCodeAt(i);
            }
    
            body += `--${boundary}\r\n`;
            body += `Content-Disposition: form-data; name="documenti"; filename="${file.name}"\r\n`;
            body += `Content-Type: ${file.type}\r\n\r\n`;
            body += uint8Array + '\r\n'; 
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            throw new Error(`Failed to process file ${file.name}: ${error}`);
          }
        }
      }
  
      body += `--${boundary}--\r\n`;
    
      const options = {
        url: `${this.patrimonioUrl}`,
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        data: body
      };
      return from(this.httpWrapper.capacitorHttpRequest(options, true));
    }


  async editPatrimonio(patrimonioData: Patrimonio, updatedDocumentiFiles: any[]): Promise<any> {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    let body = '';
  
    // UnitaImmobiliare 
    body += `--${boundary}\r\n`;
    body += 'Content-Disposition: form-data; name="unitaImmobiliare"; filename="patrimonio.json"\r\n';
    body += 'Content-Type: application/json\r\n\r\n';
    body += JSON.stringify(patrimonioData) + '\r\n';
  
    if (this.platform.is('hybrid') && updatedDocumentiFiles?.length) {
      for (const file of updatedDocumentiFiles) {
        try {

          const byteString = atob(file.data);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
  
          body += `--${boundary}\r\n`;
          body += `Content-Disposition: form-data; name="documenti"; filename="${file.name}"\r\n`;
          body += `Content-Type: ${file.type}\r\n\r\n`;
          body += uint8Array + '\r\n'; 
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          throw new Error(`Failed to process file ${file.name}: ${error}`);
        }
      }
    }

    body += `--${boundary}--\r\n`;
  
    const options = {
      url: `${this.patrimonioUrl}`,
      method: 'PUT',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      data: body
    };
    return from(this.httpWrapper.capacitorHttpRequest(options, true));
  }
  
  downloadDocument(patrimonioId: number, documentoId: number) {
    const options = {
      url: `${this.patrimonioUrl}/${patrimonioId}/documenti/${documentoId}/download`,
      method: 'GET',
      responseType: 'blob'
    };

    return from(this.httpWrapper.capacitorHttpRequest(options, false)).pipe(
      map(async (response: any) => {
        const base64Data = response.data;
        
        const fileName = this.getFileNameFromResponse(response) || `document_${new Date().getTime()}.pdf`;
        
        try {
     
          const savedFile = await Filesystem.writeFile({
            path: `Download/${fileName}`, 
            data: base64Data,
            directory: Directory.Documents,
            recursive: true // Create directories if they don't exist
          });

          console.log('File saved:', savedFile);

          const filePath = await Filesystem.getUri({
            directory: Directory.Documents,
            path: `Download/${fileName}`
          });

          console.log('File path:', filePath.uri);

          return filePath.uri;
        } catch (error) {
          console.error('Error saving file:', error);
          throw new Error(`Failed to save document: ${error}`);
        }
      }),
      catchError(error => {
        console.error('Download error:', error);
        return throwError(() => new Error(`Failed to download document: ${error.message}`));
      })
    );
}


private getFileNameFromResponse(response: any): string {
  try {
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
          if (matches != null && matches[1]) {
              return matches[1].replace(/['"]/g, '');
          }
      }
      return `document_${new Date().getTime()}.pdf`;
  } catch (error) {
      return `document_${new Date().getTime()}.pdf`;
  }
}
  

    eliminaPatrimonio(id: number) {
    if (this.platform.is('hybrid')) {

      const options = {
        url: `${this.patrimonioUrl}/${id}`,
        method: 'DELETE'
      };
      return from(this.httpWrapper.capacitorHttpRequest(options,false));
    }
    else {
      return this.http.delete<Patrimonio>(`${this.patrimonioUrl}/${id}`).pipe(
        catchError(e => { throw (e) })
      );
    }
  }

  
  private convertParams(params: HttpParams): Record<string, string> {
    return params.keys().reduce((acc, key) => {
      acc[key] = params.get(key) as string;
      return acc;
    }, {} as Record<string, string>);
  }

}
