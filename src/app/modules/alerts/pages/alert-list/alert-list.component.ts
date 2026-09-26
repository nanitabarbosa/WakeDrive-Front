import { Component } from '@angular/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './alert-list.component.html',
})
export class AlertListComponent {}
