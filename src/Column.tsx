import { AddNewItem } from './AddNewItem';
import { ColumnContainer, ColumnTitle } from './styles';

type ColumnProps = {
  text: string;
} & {
  children?: React.ReactNode;
};

export const Column: React.FC<ColumnProps> = ({ text, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => console.log(text)}
        dark
      />
    </ColumnContainer>
  );
};
