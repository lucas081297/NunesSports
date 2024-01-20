import { Injectable, OnInit } from '@angular/core';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root'
})
export class AlertsService implements OnInit {


  constructor(private confirmBoxEvokeService: ConfirmBoxEvokeService) {}

      ngOnInit() {
          this.confirmBoxEvokeService.success('I am title!', 'I am a message!', 'Confirm', 'Decline')
              .subscribe(resp => console.log('resp', resp));

          this.confirmBoxEvokeService.info('I am title!', 'I am a message!', 'Confirm', 'Decline')
              .subscribe(resp => console.log('resp', resp));

          this.confirmBoxEvokeService.warning('I am title!', 'I am a message!', 'Confirm', 'Decline')
              .subscribe(resp => console.log('resp', resp));

          this.confirmBoxEvokeService.danger('I am title!', 'I am a message!', 'Confirm', 'Decline')
              .subscribe(resp => console.log('resp', resp));
      }

  }
