import { Component } from '@angular/core';
import { MbscEventcalendarOptions, Notifications, MbscCalendarEvent , localeEs } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Notifications]
})
export class Tab2Page {

   // Place the code below into your own component or use the full template


   constructor( private notify: Notifications) {}

   myEvents: MbscCalendarEvent[] = [];

   eventSettings: MbscEventcalendarOptions = {
       locale: localeEs,
       theme: 'ios',
       themeVariant: 'light',
       clickToCreate: false,
       dragToCreate: false,
       dragToMove: false,
       dragToResize: false,
       view: {
           calendar: { labels: true }
       },
       onEventClick: (event, inst) => {
           this.notify.toast({
               message: event.event.title
           });
       }
   };

   ngOnInit(): void {
      //  this.http.jsonp < MbscCalendarEvent[] > ('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
      //      this.myEvents = resp;
      //  });
   }

}
