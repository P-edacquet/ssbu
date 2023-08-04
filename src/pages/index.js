import { useState } from 'react';
import Link from 'next/link';

export default function Home({ characters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCharacters = characters.filter(character =>
    character.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div class="flex flex-col">
      <h1 class="text-center text-4xl">Personnages de Super Smash Bros. Ultimate</h1>
      <input
        class="border"
        type="text"
        placeholder="Rechercher par nom"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
