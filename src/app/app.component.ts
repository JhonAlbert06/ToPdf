import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FileToPdf';

  constructor(private http: HttpClient) {}

  public postFile() {
    const fileInput = <HTMLInputElement>document.getElementById('images');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      this.http
        .post('http://localhost:3000/convertFile', formData, {
          responseType: 'arraybuffer',
        })
        .subscribe(
          (response: ArrayBuffer) => {
            const fileName = 'nombre_del_archivo.pdf'; // Nombre del archivo deseado
            const blob = new Blob([response], { type: 'application/pdf' });
            const fileURL = window.URL.createObjectURL(blob);
            saveAs(blob, fileName);
          },
          (error) => {
            console.error('Error al enviar el archivo:', error);
          }
        );
    } else {
      console.error('No se seleccionó ningún archivo');
    }
  }
}
