import { useState } from 'react';
import Link from 'next/link';

export default function Home({ characters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCharacters = characters.filter(character =>
    character.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Personnages de Super Smash Bros. Ultimate</h1>
      <input
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
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
