import { Injectable } from '@angular/core';
import { ToastButton, ToastController } from '@ionic/angular';

  interface ToastConfig {
    message: string;
    color?: string;
    icon?: string;
    duration?: number;
  }

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastController: ToastController) {}

     private async showToast(config: ToastConfig) {
      const {
        message, 
        color = 'dark', 
        icon = 'alert-circle-outline', 
        duration = 3000
      } = config;
  
      const closeButton: ToastButton = {
        icon: 'close',
        role: 'cancel',
        handler: () => {}
      };
  
      const toast = await this.toastController.create({
        message: message,
        duration: duration,
        color: color,
        icon: icon,
        position: 'bottom',
        cssClass: 'custom-toast',
        buttons: [closeButton],
        animated: true,
        translucent: false
      }

      );
      await toast.present();
    } 

    async success(message: string, duration?: number) {
      await this.showToast({
        message, 
        color: 'success', 
        icon: 'checkmark-circle', 
        duration
      });
    }
  
    async error(message: string, duration?: number) {
      await this.showToast({
        message, 
        color: 'danger', 
        icon: 'alert-circle', 
        duration
      });
    }
  
    async warning(message: string, duration?: number) {
      await this.showToast({
        message, 
        color: 'warning', 
        icon: 'warning', 
        duration
      });
    }
  
    async info(message: string, duration?: number) {
      await this.showToast({
        message, 
        color: 'primary', 
        icon: 'information-circle', 
        duration
      });
    }
  }
