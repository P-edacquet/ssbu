import { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';

export default function CharacterDetail({ character }) {
  const router = useRouter();
  const { id } = router.query;

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(character);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/personnages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Erreur lors de la mise à jour du personnage');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du personnage', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${character.nom} ?`)) {
      try {
        const response = await fetch(`http://localhost:5000/personnages/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          router.push('/');
        } else {
          console.error('Erreur lors de la suppression du personnage');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du personnage', error);
      }
    }
  };

  return (
    <div class="flex justify-center text-center">
      {editing ? (
        <div class="flex flex-col text-center">
          <h1>Modification {character.nom}</h1>
          <form id="edit" onSubmit={handleSubmit} class="flex flex-col justify-center gap-4">
            <div>
              <label>Nom:</label>
              <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
            </div>
            <div>
              <label>Poids:</label>
              <input type="number" name="poids" value={formData.poids} onChange={handleInputChange} />
            </div>
            <div>
              <label>Franchise:</label>
              <input type="text" name="franchise" value={formData.franchise} onChange={handleInputChange} />
            </div>
            <div>
              <label>Tier:</label>
              <input type="text" name="tier" value={formData.tier} onChange={handleInputChange} />
            </div>
            <div class="btn-group btn-group-vertical w-full mt-12">
              <button type="submit">Sauvegarder</button>
              <button type="button" onClick={() => setEditing(false)}>Annuler</button>
            </div>
          </form>
        </div>
      ) : (
        <section>
          <h1>{character.nom}</h1>
          <p>Franchise: {character.franchise}</p>
          <p>Poids: {character.poids}</p>
          <p>Tier: {character.tier}</p>
          <div class="btn-group btn-group-vertical mt-12">
            <button onClick={() => setEditing(true)}>Modifier</button>
            <button onClick={handleDelete}>Supprimer</button>
            <BackButton />
          </div>
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const response = await fetch(`http://localhost:5000/personnages/${id}`);
  const character = await response.json();
  return {
    props: { character },
  };
}
