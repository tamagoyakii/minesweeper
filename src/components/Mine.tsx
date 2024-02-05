import { Element } from 'src/types/gameTypes';

type MineProps = {
  mine: Element;
};

export default function Mine({ mine }: MineProps) {
  const { element, isRevealed, flagType } = mine;

  const imageURL = () => {
    if (!isRevealed) return flagType;
    if (element === -1) return 'bombrevealed';
    if (element === -2) return 'bombdeath';
    if (element === -3) return 'bombmisflagged';
    return `open${element}`;
  };

  return (
    <img
      src={`https://freeminesweeper.org/images/${imageURL()}.gif`}
      width='100%'
      height='100%'
      alt=''
    />
  );
}
