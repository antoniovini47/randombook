/* Comentário para o teste técnico: 
Aqui é um simples component que pode ser reutilizado durante toda a aplicação
para simbolizar carregamento. Centralizando isso em um único component fica mais fácil
uma possível manutenção e troca de ícones, caso necessário.
Podendo colocar uma animação mais complexa relacionada ao carregamento, por exemplo.
*/

import { CgSpinnerTwoAlt } from "react-icons/cg";

const defaultSize = 10;

type LoadingIconProps = {
  size?: number;
  className?: string;
};

const LoadingIcon = ({ size = defaultSize, className }: LoadingIconProps) => {
  return <CgSpinnerTwoAlt className={`w-${size} h-${size} animate-spin ${className}`} />;
};

export default LoadingIcon;
