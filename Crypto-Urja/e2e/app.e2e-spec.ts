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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for Crypto-Urja', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Crypto-Urja', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Crypto-Urja');
    })
  });

  it('network-name should be crypto-urja@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('crypto-urja@0.0.1.bna');
    });
  });

  it('navbar-brand should be Crypto-Urja',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('Crypto-Urja');
    });
  });

  
    it('Coins component should be loadable',() => {
      page.navigateTo('/Coins');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Coins');
      });
    });

    it('Coins table should have 4 columns',() => {
      page.navigateTo('/Coins');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Energy component should be loadable',() => {
      page.navigateTo('/Energy');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Energy');
      });
    });

    it('Energy table should have 8 columns',() => {
      page.navigateTo('/Energy');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('EnergyListing component should be loadable',() => {
      page.navigateTo('/EnergyListing');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('EnergyListing');
      });
    });

    it('EnergyListing table should have 9 columns',() => {
      page.navigateTo('/EnergyListing');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('User component should be loadable',() => {
      page.navigateTo('/User');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('User');
      });
    });

    it('User table should have 7 columns',() => {
      page.navigateTo('/User');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ProduceEnergy component should be loadable',() => {
      page.navigateTo('/ProduceEnergy');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ProduceEnergy');
      });
    });
  
    it('UseEnergy component should be loadable',() => {
      page.navigateTo('/UseEnergy');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UseEnergy');
      });
    });
  
    it('RequestEnergy component should be loadable',() => {
      page.navigateTo('/RequestEnergy');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RequestEnergy');
      });
    });
  
    it('GiveEnergy component should be loadable',() => {
      page.navigateTo('/GiveEnergy');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('GiveEnergy');
      });
    });
  

});