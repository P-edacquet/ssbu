const getUniqueFranchises = (characters) => {
  const franchises = characters.map((character) => character.franchise);
  const uniqueFranchises = [...new Set(franchises)];
  return ['Toutes franchises', ...uniqueFranchises.sort()];
};

const getUniqueTiers = (characters) => {
  const tiers = characters.map((character) => character.tier);
  const uniqueTiers = [...new Set(tiers)];
  return ['Tous tiers', ...uniqueTiers.sort()];
};

export { getUniqueFranchises, getUniqueTiers };