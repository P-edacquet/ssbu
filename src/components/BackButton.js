import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack}>Retour</button>
  );
}
