import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {}

  openWhatsapp(): WindowProxy {
    return this.contactService.openWhatsappContact()
  }

}
