import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { DOCUMENT } from '@angular/common'

const API_URL = 'https://wa.me/553199818010'

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(
    private router: Router,
    @Inject(DOCUMENT) readonly document: Document
  ) { }

  getWindow(): Window {
    return this.document.defaultView
  }

  openWhatsappContact(): WindowProxy {
    const url = `${API_URL}?text=Olá! Vim através do contato no site.`
    return this.openExternalWhatsappUrl(url)
  }

  openWhatsappViaProduct(productName: string): WindowProxy {
    const url = `${API_URL}?text?text=Olá, tenho interesse no produto ${productName}`
    return this.openExternalWhatsappUrl(url)
  }

  private openExternalWhatsappUrl(url: string): WindowProxy {
    const window = this.getWindow()
    return window.open(url)
  }
}
