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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * @param {org.example.biznet.UseEnergy} useEnergy
 * @transaction
 */

 async function useEnergy(useEnergy) {
    
    let tx = useEnergy;
    if(tx.energy.owner.userId != tx.owner.userId){

        throw new Error("Not the owner of energy");
    }

    if(tx.value > tx.energy.value){

        throw new Error("cannot consume more energy");
    }

    tx.energy.value -= tx.value;
    tx.energy.used += tx.value;

    const assetRegistry = await getAssetRegistry('org.example.biznet.Energy');
    await assetRegistry.update(tx.energy);
 }

 /**
  * @param {org.example.biznet.ProduceEnergy} produceEnergy
  * @transaction
  */
 async function produceEnergy(produceEnergy){

    let tx = produceEnergy;
    if(tx.energy.owner.userId != tx.owner.userId){

        throw new Error("Not the owner of energy");
    }

    if(tx.owner.type == 'Resident' && tx.value >= 10000){

        throw new Error("Not authorized to produce energy more than 10000kW .. please register as provider.");
    }

    if(tx.owner.type == 'Provider' && tx.value < 10000){

        throw new Error("Not enough production ..");
    }

    tx.energy.produced += tx.value;
    tx.energy.value += tx.value;

    const assetRegistry = await getAssetRegistry('org.example.biznet.Energy');
    await assetRegistry.update(tx.energy);
 }
 
 /**
  * @param {org.example.biznet.RequestEnergy} requestEnergy
  * @transaction
  */

async function requestEnergy(requestEnergy) {
    
    let tx = requestEnergy;
    let allListing = await query('getAllListing');
	
    let minDistance = 100000;
    let minCostSource = null;
  	
   for(i=0;i<allListing.length;i++){
		let listing = allListing[i];
        if(listing.state != 'Available' || listing.energy.value < tx.requiredEnergy)
            continue ;

        let x_distance = Math.abs(listing.lat - tx.requester.lat);
        let y_distance = Math.abs(listing.long - tx.requester.long);
        if(x_distance + y_distance < minDistance){

            minDistance = x_distance+y_distance;
            minCostSource = listing;
        }
    }
    

    if(minCostSource){

        if(!minCostSource.requests){
            minCostSource.requests = [];
        }

        minCostSource.requests.push(requestEnergy);

        const listingRegistry = await getAssetRegistry('org.example.biznet.EnergyListing');
        await listingRegistry.update(minCostSource);
        console.log(minCostSource);
    }
}

/**
 * @param {org.example.biznet.GiveEnergy} giveEnergy
 * @transaction
 */
async function giveEnergy(giveEnergy){

    let tx = giveEnergy;

    if(tx.listing.energy.owner.userId != tx.owner.userId){

        throw new Error("Not the owner of energy");
    }

    if(tx.listing.state != 'Available'){

        throw new Error("Energy already spent");
    }

    if(tx.listing.requests == null){

        throw new Error("No requests");
    }

    let max=-1,reputedRequest=null;
  //console.log(tx.listing.requests.length);
    for(var i=0; i < tx.listing.requests.length; i++){
		
	 let request = tx.listing.requests[i];   
      let requesterEnergy = request.energy;
      console.log(requesterEnergy);
        let requesterReputation = (requesterEnergy.sold)/(requesterEnergy.produced);
        if(requesterReputation > max){
            max = requesterReputation;
            reputedRequest = request;
        }
     
    }

    if(reputedRequest){
		
        tx.listing.state = "Sold";
        tx.listing.energy.value -= reputedRequest.requiredEnergy;
        tx.listing.energy.sold += reputedRequest.requiredEnergy;
        let requesterEnergy = reputedRequest.energy;
        requesterEnergy.value += reputedRequest.requiredEnergy; 
        let requesterCoin = reputedRequest.coin;
        requesterCoin.value -= reputedRequest.requiredEnergy/10;
        let sellerCoin = tx.listing.coin;
        sellerCoin.value -= reputedRequest.requiredEnergy/10;

        const energyRegistry = await getAssetRegistry('org.example.biznet.Energy');
        await energyRegistry.updateAll([tx.listing.energy,requesterEnergy]);
        
        const coinRegistry = await getAssetRegistry('org.example.biznet.Coins');
        await coinRegistry.updateAll([requesterCoin,sellerCoin]);
    }

    const listingRegistry = await getAssetRegistry('org.example.biznet.EnergyListing');
    await listingRegistry.update(tx.listing);
}
