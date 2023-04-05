import { useRouter } from "next/router";

const BackTo = ({ returnPath }: { returnPath: string }) => {
  const router = useRouter();
  return (
    <div className="backto" onClick={() => router.back()}>
      <span>Retour à {returnPath}</span>
    </div>
  );
};

export default BackTo;
