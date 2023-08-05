import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUniqueFranchises, getUniqueTiers } from './utils';
import NewCharacterButton from '../components/NewCharacterButton';

export default function Home({ characters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [franchiseFilter, setFranchiseFilter] = useState('Toutes franchises');
  const [tierFilter, setTierFilter] = useState('Tous tiers');
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  const uniqueFranchises = getUniqueFranchises(characters);
  const uniqueTiers = getUniqueTiers(characters);

  useEffect(() => {
    const filteredBySearch = characters.filter((character) =>
      character.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredByFranchise = franchiseFilter === 'Toutes franchises'
      ? filteredBySearch
      : filteredBySearch.filter(character => character.franchise === franchiseFilter);

    const filteredByTier = tierFilter === 'Tous tiers'
      ? filteredByFranchise
      : filteredByFranchise.filter(character => character.tier === tierFilter);

    setFilteredCharacters(filteredByTier);
  }, [searchTerm, franchiseFilter, tierFilter]);

  return (
    <div class="flex flex-col items-center">
      <h1>Personnages de Super Smash Bros. Ultimate</h1>
      <NewCharacterButton />
      <div>
        <label>Rechercher par nom:</label>
        <input
          class="mb-12"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <label>Filtrer par franchise:</label>
        <select value={franchiseFilter} onChange={(e) => setFranchiseFilter(e.target.value)}>
          {uniqueFranchises.map((franchise) => (
            <option key={franchise} value={franchise}>
              {franchise}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Filtrer par tier:</label>
        <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
          {uniqueTiers.map((tier) => (
            <option key={tier} value={tier}>
              {tier}
            </option>
          ))}
        </select>
      </div>

      <ul class="flex flex-wrap gap-4 justify-center">
        {filteredCharacters.map((character) => (
          <li key={character.id}>
            <Link legacyBehavior href={`/characters/${character.id}`}>
              <a>{character.nom}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:5000/personnages');
  const characters = await response.json();
  return {
    props: { characters },
  };
}
