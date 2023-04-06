import { useRouter } from "next/router";

const BackTo = () => {
  const router = useRouter();
  return (
    <div className="backto" onClick={() => router.back()}>
      <span>Retour</span>
    </div>
  );
};

export default BackTo;
