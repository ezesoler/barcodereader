import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrowserBarcodeReader } from '@zxing/library';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showAnim = false;
  constructor(public navCtrl: NavController, public plt: Platform) {
    const codeReader = new BrowserBarcodeReader();
    codeReader.getVideoInputDevices()
    .then(videoInputDevices => {
        let firstDeviceId = videoInputDevices[1].deviceId;
        if (this.plt.is('ios')) {
          firstDeviceId = videoInputDevices[0].deviceId;
        }
        this.showAnim = true;
        codeReader.decodeFromInputVideoDevice(firstDeviceId, 'video')
            .then(result => alert(result.getText()))
            .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

}
