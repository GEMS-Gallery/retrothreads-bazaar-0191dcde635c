export const idlFactory = ({ IDL }) => {
  const ItemId = IDL.Nat;
  const UserId = IDL.Text;
  const Item = IDL.Record({
    'id' : ItemId,
    'title' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'imageUrl' : IDL.Text,
    'price' : IDL.Float64,
  });
  return IDL.Service({
    'addItem' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Float64, IDL.Text],
        [ItemId],
        [],
      ),
    'addToCart' : IDL.Func([UserId, ItemId], [IDL.Bool], []),
    'getCart' : IDL.Func([UserId], [IDL.Vec(Item)], ['query']),
    'getItem' : IDL.Func([ItemId], [IDL.Opt(Item)], ['query']),
    'getItems' : IDL.Func([], [IDL.Vec(Item)], ['query']),
    'initializeItems' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
