import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Item {
  'id' : ItemId,
  'title' : string,
  'description' : [] | [string],
  'imageUrl' : string,
  'price' : number,
}
export type ItemId = bigint;
export type UserId = string;
export interface _SERVICE {
  'addItem' : ActorMethod<[string, [] | [string], number, string], ItemId>,
  'addToCart' : ActorMethod<[UserId, ItemId], boolean>,
  'getCart' : ActorMethod<[UserId], Array<Item>>,
  'getItem' : ActorMethod<[ItemId], [] | [Item]>,
  'getItems' : ActorMethod<[], Array<Item>>,
  'initializeItems' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
