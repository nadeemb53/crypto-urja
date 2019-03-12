import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.biznet{
   export enum UserType {
      Resident,
      Provider,
   }
   export class User extends Participant {
      userId: string;
      name: string;
      lat: number;
      long: number;
      type: UserType;
      reputation: number;
   }
   export class Coins extends Asset {
      coinsID: string;
      value: number;
      owner: User;
   }
   export class Energy extends Asset {
      energyId: string;
      units: string;
      value: number;
      produced: number;
      sold: number;
      used: number;
      owner: User;
   }
   export enum ListingState {
      Available,
      Sold,
   }
   export class EnergyListing extends Asset {
      energyListingId: string;
      owner: User;
      coin: Coins;
      lat: number;
      long: number;
      state: ListingState;
      energy: Energy;
      requests: RequestEnergy[];
   }
   export class ProduceEnergy extends Transaction {
      owner: User;
      energy: Energy;
      value: number;
   }
   export class UseEnergy extends Transaction {
      owner: User;
      energy: Energy;
      value: number;
   }
   export class RequestEnergy extends Transaction {
      requiredEnergy: number;
      requester: User;
      energy: Energy;
      coin: Coins;
   }
   export class GiveEnergy extends Transaction {
      listing: EnergyListing;
      owner: User;
   }
// }
