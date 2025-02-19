import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, from, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  /**
   * @param header Alert header/title
   * @param message Alert message body
   * @param cssClass Optional custom CSS class
   * @returns boolean
   */

  showConfirmation(
    header: string, 
    message: string, 
    alertInputs?: any,
    cssClass: string = 'custom-alert' 
  ): Observable<boolean> {
    const alert = this.alertController.create({
      header: header,
      message: message,
      inputs: alertInputs,
      cssClass: cssClass,
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons: [
        {
          text: 'Conferma',
          cssClass: 'alert-button-confirm',
          handler: () => true
        },
        {
          text: 'Annulla',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => false
        }
      ],
      backdropDismiss : false,
    });

    return from(alert).pipe(
      switchMap(alertElement => {
        alertElement.present();
        return from(alertElement.onDidDismiss()).pipe(
          map(result => result.role !== 'cancel')
        );
      })
    );
  }

  /**
   * @param header Alert header/title
   * @param message Alert message body
   * @param cssClass Optional custom CSS class
   * @returns 
   */
  showInfo(
    header: string, 
    message: string, 
    cssClass: string = 'custom-alert'
  ): Observable<any> {
    const alert = this.alertController.create({
      header: header,
      message: message,
      cssClass: cssClass,
      buttons: ['OK'],
      backdropDismiss : false
    });

    return from(alert).pipe(
      switchMap(alertElement => {
        alertElement.present();
        return from(alertElement.onDidDismiss());
      })
    );
  }
}


