import React from 'react';
import Column from './Column';
import { CardType, ColumnType, Direction } from './AppTypes';
import { fakeData } from './fakeData';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [columns, setColumns] = React.useState<Array<ColumnType>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const wait = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    wait(1000).then(() => {
      setColumns(fakeData);
      setIsLoading(false);
    });
  }, [setColumns]);

  const removeCardFromColumnCards = (columnCards: Array<CardType>, cardId: number): { cardToMove: CardType | undefined, updatedColumnCards: Array<CardType> } => {
    let cardToMove;
    const updatedColumnCards = columnCards.filter((card: CardType) => {
      if (card.cardId === cardId) {
        cardToMove = card;
      }
      return card.cardId !== cardId;
    });

    return { cardToMove, updatedColumnCards };
  }

  /**
   * Move a card to a new column on click
   * 
   * @param columnId number
   * @param cardId number
   * @param direction 'left' | 'right'
   */
  const moveCardOnClick = (columnId: number, cardId: number, direction: Direction) => {
    if (!columns.length) return;

    // Determine the target column id
    let targetColumnId = columnId;
    if (direction === Direction.LEFT && columns[columnId - 1]) {
      targetColumnId = columnId - 1;
    } else if (direction === Direction.RIGHT && columns[columnId + 1]) {
      targetColumnId = columnId + 1;
    }

    // Create a copy of the columns in state
    const tempColumns = [...columns];

    // Remove card from source column
    const { cardToMove, updatedColumnCards } = removeCardFromColumnCards(tempColumns[columnId].cards, cardId);
    tempColumns[columnId].cards = updatedColumnCards;

    // Add card to target column
    if (cardToMove) {
      tempColumns[targetColumnId].cards.push(cardToMove);
    }

    // Update columns in state
    setColumns(tempColumns);
  };

  /**
   * Move a card to a new column on drop
   * 
   * @param targetColumnId number
   * @param sourceColumnId number
   * @param cardId number
   */
  const moveCardOnDrop = (targetColumnId: number, sourceColumnId: number, cardId: number) => {
    if (!columns.length) return;

    // Create a copy of columns in state
    const tempColumns = [...columns];

    // Remove card from source column
    const { cardToMove, updatedColumnCards } = removeCardFromColumnCards(tempColumns[sourceColumnId].cards, cardId);
    tempColumns[sourceColumnId].cards = updatedColumnCards;

    // Add card to target column
    if (cardToMove) {
      tempColumns[targetColumnId].cards.push(cardToMove);
    }

    // Update columns in state
    setColumns(tempColumns);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <section className="App-board">
        {isLoading &&
          (<div>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Loading data...</h2>
          </div>)}
        {!isLoading && columns.map((col, index) => {
          return (
            <Column key={index} {...col} columnId={index} moveCardOnClick={moveCardOnClick} moveCardOnDrop={moveCardOnDrop} />
          )
        })}
      </section>
    </div>
  );
}

export default App;
