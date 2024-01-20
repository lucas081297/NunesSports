import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesProducts } from 'src/app/Services/products.service';
import { interval, firstValueFrom } from 'rxjs';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
  ToastPositionEnum,
  ToastNotificationInitializer,
  ToastProgressBarEnum,
  ToastUserViewTypeEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  allProducts:any
  editNumber:any = -1
  isAdd = false
  valid:any

  public changeForm: FormGroup = this.formBuilder.group({
    newName: ['',Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")],
    newPrice: ['',Validators.min(0)],
    newDesc: ['']
  })

  public addForm: FormGroup = this.formBuilder.group({
    newName: ['',Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$")],
    newPrice: ['',Validators.min(0)],
    newDesc: ['']
  })

  addProduct(){
    this.isAdd = true;
  }

  async deleteProduct(cod:number,name:string){
    const response = await (this.confirmDanger('',`Deseja deletar o produto?\n ${cod} - ${name}`))
    if(response=='sim'){
      this.servicesProducts.deleteProduct({cod}).subscribe({
        next:(res)=>{
          this.sucessAlert(`Produto ${cod} - ${name} deletado!`)
          return this.ngOnInit()
        },
        error:(res)=>{
          this.warningAlert('Erro ao Deletar Produto!')
          return this.ngOnInit()
        }
      })
    }
    else{

    }
    }

  editProduct(cod:{cod:number}){
    this.editNumber = cod
  }

  saveProduct(){
    if(this.changeForm.controls['newName'].invalid){
      this.warningAlert('Nome Inválido')
    }
    if(this.changeForm.controls['newName'].value != ""){
      var nome = this.changeForm.controls['newName'].value;
    }
    if(this.changeForm.controls['newName'].value == ""){
      nome = this.allProducts[this.editNumber-1].nome
    }

    if(this.changeForm.controls['newPrice'].invalid){
      this.warningAlert('Preço inválido')
    }
    if(this.changeForm.controls['newPrice'].value != ""){
      var preco = this.changeForm.controls['newPrice'].value
    }
    if(this.changeForm.controls['newPrice'].value == ""){
      preco = this.allProducts[this.editNumber-1].preco
    }
    if(this.changeForm.controls['newDesc'].value != ""){
      var desc = this.changeForm.controls['newDesc'].value
    }
    if(this.changeForm.controls['newDesc'].value == ""){
      desc = this.allProducts[this.editNumber-1].descricao
    }
    const cod = this.editNumber;
    this.servicesProducts.editProduct({cod,nome,preco,desc}).subscribe({
      next: (res) => {
        console.log(nome,preco,desc)
        this.sucessAlert(`Produto ${cod} - ${nome} modificado com sucesso!`)
        this.editNumber = -1;
        this.ngOnInit()
      },
      error: (error) => {

      }
    })
  }

  saveNewProduct(){
    if(this.addForm.controls['newName'].invalid || this.addForm.controls['newName'].value==''){
      return this.warningAlert('Nome Inválido')
    }
    if(this.addForm.controls['newPrice'].invalid || this.addForm.controls['newPrice'].value==''){
      return this.warningAlert('Preço inválido')
    }
    else{
      var nome = (this.addForm.controls['newName'].value)
      var preco = (this.addForm.controls['newPrice'].value)
      var desc = (this.addForm.controls['newDesc'].value)
      this.servicesProducts.addProduct({nome,preco,desc}).subscribe({
        next: (res)=>{
          this.sucessAlert(`Produto adicionado com sucesso ${nome}`)
          this.isAdd=false
          return this.ngOnInit()
        },
        error:(error)=>{
        }
      })
    }
  }

  constructor (private servicesProducts:ServicesProducts,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.servicesProducts.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res;
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }

  async confirmDanger(title:string,message:string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle(title);
    newConfirmBox.setMessage(message);

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'right', // optional
    });

    newConfirmBox.setButtonLabels('SIM', 'NÃO');

    const response = await firstValueFrom(newConfirmBox.openConfirmBox$())
    return response.clickedButtonID
  }

  sucessAlert(message:string) {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('Informação');
    newToastNotification.setMessage(message);

    // Choose layout color type
    newToastNotification.setConfig({
    autoCloseDelay: 5000, // optional
    textPosition: 'right', // optional
    layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
    progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
    toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
    animationIn: AppearanceAnimation.SWING, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
     // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
    toastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
}

  warningAlert(message:string) {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('Erro');
    newToastNotification.setMessage(message);

    // Choose layout color type
    newToastNotification.setConfig({
    autoCloseDelay: 5000, // optional
    textPosition: 'right', // optional
    layoutType: DialogLayoutDisplay.WARNING, // SUCCESS | INFO | NONE | DANGER | WARNING
    progressBar: ToastProgressBarEnum.DECREASE, // INCREASE | DECREASE | NONE
    toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
    animationIn: AppearanceAnimation.SWING, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
     // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
    toastPosition: ToastPositionEnum.TOP_RIGHT,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
}

}
