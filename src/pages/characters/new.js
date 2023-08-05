import { useState } from 'react';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton';

export default function NewCharacter() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: '',
    poids: '',
    franchise: '',
    tier: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/personnages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Erreur lors de la création du personnage');
      }
    } catch (error) {
      console.error('Erreur lors de la création du personnage', error);
    }
  };

  return (
    <div class="flex flex-col justify-center items-center text-center">
      <h1>Nouveau personnage</h1>
      <form id="new" onSubmit={handleSubmit} class="flex flex-col justify-center gap-4 max-w-md">
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
        <div class="btn-group btn-group-vertical mt-12">
          <button type="submit">Créer</button>
          <BackButton />
        </div>
      </form>
    </div>
  );
}
