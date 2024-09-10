import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";

import Float "mo:base/Float";
import Int "mo:base/Int";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  type ItemId = Nat;
  type UserId = Text;

  type Item = {
    id: ItemId;
    title: Text;
    description: ?Text;
    price: Float;
    imageUrl: Text;
  };

  stable var nextItemId: Nat = 0;
  let items = HashMap.HashMap<ItemId, Item>(10, Int.equal, Int.hash);
  let carts = HashMap.HashMap<UserId, [ItemId]>(10, Text.equal, Text.hash);

  public func addItem(title: Text, description: ?Text, price: Float, imageUrl: Text) : async ItemId {
    let id = nextItemId;
    nextItemId += 1;
    let newItem: Item = {
      id;
      title;
      description;
      price;
      imageUrl;
    };
    items.put(id, newItem);
    id
  };

  public query func getItems() : async [Item] {
    Iter.toArray(items.vals())
  };

  public query func getItem(id: ItemId) : async ?Item {
    items.get(id)
  };

  public func addToCart(userId: UserId, itemId: ItemId) : async Bool {
    switch (items.get(itemId)) {
      case (null) { false };
      case (?_) {
        let userCart = Option.get(carts.get(userId), []);
        carts.put(userId, Array.append(userCart, [itemId]));
        true
      };
    }
  };

  public query func getCart(userId: UserId) : async [Item] {
    let userCart = Option.get(carts.get(userId), []);
    Array.mapFilter<ItemId, Item>(userCart, func (id) { items.get(id) })
  };

  public func initializeItems() : async () {
    ignore addItem("Vintage Denim Jacket", ?"Classic 80s style", 89.99, "https://example.com/denim.jpg");
    ignore addItem("Retro Sunglasses", ?"60s inspired shades", 29.99, "https://example.com/sunglasses.jpg");
    ignore addItem("Antique Pocket Watch", ?"19th century timepiece", 199.99, "https://example.com/watch.jpg");
  };
}
