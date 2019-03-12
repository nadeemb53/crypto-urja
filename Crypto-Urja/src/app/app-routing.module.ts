/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CoinsComponent } from './Coins/Coins.component';
import { EnergyComponent } from './Energy/Energy.component';
import { EnergyListingComponent } from './EnergyListing/EnergyListing.component';

import { UserComponent } from './User/User.component';

import { ProduceEnergyComponent } from './ProduceEnergy/ProduceEnergy.component';
import { UseEnergyComponent } from './UseEnergy/UseEnergy.component';
import { RequestEnergyComponent } from './RequestEnergy/RequestEnergy.component';
import { GiveEnergyComponent } from './GiveEnergy/GiveEnergy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Coins', component: CoinsComponent },
  { path: 'Energy', component: EnergyComponent },
  { path: 'EnergyListing', component: EnergyListingComponent },
  { path: 'User', component: UserComponent },
  { path: 'ProduceEnergy', component: ProduceEnergyComponent },
  { path: 'UseEnergy', component: UseEnergyComponent },
  { path: 'RequestEnergy', component: RequestEnergyComponent },
  { path: 'GiveEnergy', component: GiveEnergyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
