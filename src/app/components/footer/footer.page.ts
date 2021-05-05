import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  openWhatsapp(): WindowProxy {
    return this.contactService.openWhatsappContact()
  }

}
