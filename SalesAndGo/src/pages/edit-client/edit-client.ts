import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PrimaveraProvider } from '../../providers/primavera/primavera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ClientPage } from '../client/client';

/**
 * Generated class for the EditClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
  providers: [PrimaveraProvider]
})
export class EditClientPage {
  client: any;
  editClientForm: FormGroup;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public primavera: PrimaveraProvider, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.client = navParams.get('client');
    this.id = this.client["Cliente"];
    let nome = this.client['nome'];
    let Morada = this.client['Fac_Mor'];
    let Telefone = this.client['Fac_Tel'];
    let NumContribuinte = this.client['NumContrib'];
    let Moeda = this.client['Moeda'];
    this.editClientForm = this.formBuilder.group({
      Nome: [nome, Validators.required],
      Morada: [Morada, Validators.required],
      Telefone: [Telefone, Validators.required],
      NumContribuinte: [NumContribuinte, Validators.required],
      Moeda: [Moeda, Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClientPage');
  }

  goToHomePage()
  {
    this.navCtrl.setRoot(HomePage);
  }

  editClient()
  {
    const access_token = this.primavera.genAccessToken();
    let nome = this.editClientForm.value['Nome'];
    let Morada = this.editClientForm.value['Morada'];
    let Telefone = this.editClientForm.value['Telefone'];
    let NumContribuinte = this.editClientForm.value['NumContribuinte'];
    let Moeda = this.editClientForm.value['Moeda'];

    const body = {
      "CodigoTabLog": "Cliente",
      "ChaveLog": "Cliente",
      "EstadoBE": "",
      "Cliente": this.id,
      "Nome": nome,
      "Morada": Morada,
      "Telefone": Telefone,
      "NumContribuinte": NumContribuinte,
      "Moeda": Moeda,
      "EmModoEdicao": true
      };
      
    if(this.primavera.createClient(access_token, body) == 1)
    {
      let alert = this.alertCtrl.create();
      alert.setTitle('Cliented Successfully Edited');

      alert.addButton({
        text: 'Dismiss',
        handler: data=>{this.navCtrl.setRoot(ClientPage, {cid: this.id});}
      })
      alert.present();
    }
    else
    {
      let toast = this.toastCtrl.create({
        message: 'Client Failed to be Edited',
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

  }

}
