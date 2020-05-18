import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { ProfessionalsComponent } from './professionals.component';
import { ProfessionalMainComponent } from './professional-main/professional-main.component';
import { ProfessionalDetailComponent } from './professional-detail/professional-detail.component';
import { ProfessionalListComponent } from './professional-list/professional-list.component';
// import { HireComponent } from './hire/hire.component';
// import { ScoreComponent } from './score/score.component';
// import { ScoreListComponent } from './score/score-list/score-list.component';
import { ScoreModule } from './score/score.module';
import { CoreModule } from '../core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProfessionalsComponent, ProfessionalMainComponent, ProfessionalDetailComponent, ProfessionalListComponent],
  imports: [
    CommonModule,
    ProfessionalsRoutingModule,
    ScoreModule,
    CoreModule,
    HttpClientModule,
    //SharedModule
  ],
  exports:[
    ProfessionalMainComponent
  ]
})
export class ProfessionalsModule { }
