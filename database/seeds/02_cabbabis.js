
exports.seed = function(knex, Promise) {
  return knex('cannabis').insert([
    {
    name: 'Sweet Tooth', 
    type: 'Indaca', 
    flavors: `Sweet, Flowery, Berry`, 
    effects: `Relaxed, Happy, Euphoric, Uplifted, Sleepy`, 
    description: "Sweet Tooth was awarded 1st place at the High Times Cannabis Cup in 2001, and as you could probably guess from the name, it has a sweet smell of flowers and berries that accompanies it. The potent colas of this balanced hybrid are candy-coated with trichomes, providing uplifted and euphoric effects that are great for combating stress and headaches. Bred by Barney's Farm, Sweet Tooth's genetics sprout from mixing landrace strains from Afghanistan, Hawaii, and Nepal.", 
    rating: "3.18"  }
  ])
};
