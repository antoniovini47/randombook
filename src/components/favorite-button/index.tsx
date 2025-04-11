/* Comentário para o teste técnico:
Aqui eu quis demonstrar um componente com propósito extremamente específico,
(Que é o correto e a prática que utilizo em aplicações maiores, mas para fins de teste técnico, serve)
mas que pode ser reutilizado em outras partes da aplicação.

E o uso de localStorage para guardar dados localmente,
dados esses que são resgatados quando o componente é montado.
*/
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartCrackIcon, HeartIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type FavoriteButtonProps = {
  id: string | undefined;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isError?: boolean;
};

const FavoriteButton = ({ id, className, onClick, isLoading, isError }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>();

  useEffect(() => {
    setIsFavorite(localStorage.getItem(`favorite-${id}`) === "true");
  }, [isFavorite, id]);

  if (isLoading) {
    return <Skeleton className="w-4 h-4" />;
  }

  if (isError) {
    return (
      <div>
        <HeartCrackIcon className="w-4 h-4" />
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={(event) => {
        setIsFavorite(!isFavorite);
        localStorage.setItem(`favorite-${id}`, (!isFavorite).toString());
        if (onClick) onClick(event);
      }}
      className={className}>
      {isFavorite ? (
        <HeartIcon fill="red" className="w-4 h-4" />
      ) : (
        <HeartIcon className="w-4 h-4" />
      )}
    </Button>
  );
};

export default FavoriteButton;
