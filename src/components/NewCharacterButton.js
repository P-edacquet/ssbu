import Link from 'next/link';

export default function NewCharacterButton() {
  return (
    <Link href="/characters/new">
      <button>Ajouter un nouveau personnage</button>
    </Link>
  );
}