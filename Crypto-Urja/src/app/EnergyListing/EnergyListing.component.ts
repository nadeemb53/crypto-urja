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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EnergyListingService } from './EnergyListing.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-energylisting',
  templateUrl: './EnergyListing.component.html',
  styleUrls: ['./EnergyListing.component.css'],
  providers: [EnergyListingService]
})
export class EnergyListingComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  energyListingId = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);
  coin = new FormControl('', Validators.required);
  lat = new FormControl('', Validators.required);
  long = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  energy = new FormControl('', Validators.required);
  requests = new FormControl('', Validators.required);

  constructor(public serviceEnergyListing: EnergyListingService, fb: FormBuilder) {
    this.myForm = fb.group({
      energyListingId: this.energyListingId,
      owner: this.owner,
      coin: this.coin,
      lat: this.lat,
      long: this.long,
      state: this.state,
      energy: this.energy,
      requests: this.requests
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEnergyListing.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.biznet.EnergyListing',
      'energyListingId': this.energyListingId.value,
      'owner': this.owner.value,
      'coin': this.coin.value,
      'lat': this.lat.value,
      'long': this.long.value,
      'state': this.state.value,
      'energy': this.energy.value,
      'requests': this.requests.value
    };

    this.myForm.setValue({
      'energyListingId': null,
      'owner': null,
      'coin': null,
      'lat': null,
      'long': null,
      'state': null,
      'energy': null,
      'requests': null
    });

    return this.serviceEnergyListing.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'energyListingId': null,
        'owner': null,
        'coin': null,
        'lat': null,
        'long': null,
        'state': null,
        'energy': null,
        'requests': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.biznet.EnergyListing',
      'owner': this.owner.value,
      'coin': this.coin.value,
      'lat': this.lat.value,
      'long': this.long.value,
      'state': this.state.value,
      'energy': this.energy.value,
      'requests': this.requests.value
    };

    return this.serviceEnergyListing.updateAsset(form.get('energyListingId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceEnergyListing.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceEnergyListing.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'energyListingId': null,
        'owner': null,
        'coin': null,
        'lat': null,
        'long': null,
        'state': null,
        'energy': null,
        'requests': null
      };

      if (result.energyListingId) {
        formObject.energyListingId = result.energyListingId;
      } else {
        formObject.energyListingId = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.coin) {
        formObject.coin = result.coin;
      } else {
        formObject.coin = null;
      }

      if (result.lat) {
        formObject.lat = result.lat;
      } else {
        formObject.lat = null;
      }

      if (result.long) {
        formObject.long = result.long;
      } else {
        formObject.long = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.energy) {
        formObject.energy = result.energy;
      } else {
        formObject.energy = null;
      }

      if (result.requests) {
        formObject.requests = result.requests;
      } else {
        formObject.requests = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'energyListingId': null,
      'owner': null,
      'coin': null,
      'lat': null,
      'long': null,
      'state': null,
      'energy': null,
      'requests': null
      });
  }

}
