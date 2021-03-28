import * as React from 'react';
import Card from './Card';
import { CardType, Direction } from './AppTypes';

interface ColumnProps {
    columnId: number,
    cards: Array<CardType>,
    moveCardOnClick: (columnId: number, cardId: number, direction: Direction) => void,
    moveCardOnDrop: (columnId: number, sourceColumnId: number, cardId: number) => void,
    name: string,
}

const DEFAULT_CLASS_NAME = 'Column';
const HIGHLIGHTED_CLASS_NAMES = `${DEFAULT_CLASS_NAME} Column--highlighted`;

const Column = ({ cards, columnId, moveCardOnClick, moveCardOnDrop, name }: ColumnProps) => {
    const [className, setClassName] = React.useState<string>(DEFAULT_CLASS_NAME);

    /**
     * Prevent the default behavior of a drag over event, to enable dropping
     * @param event 
     */
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        if (className === DEFAULT_CLASS_NAME) {
            setClassName(HIGHLIGHTED_CLASS_NAMES);
        }
    }

    /**
     * Remove the highlighted styles from the column when a dragged card leaves the column
     */
    const handleDragLeave = () => {
        setClassName(DEFAULT_CLASS_NAME);
    }

    /**
     * On drop, remove the highlighted styles from the column and call moveCardOnDrop()
     * with the current column id (target column id), the source column id, and the card id
     * @param event React.DragEvent
     */
    const handleCardDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setClassName(DEFAULT_CLASS_NAME);
        moveCardOnDrop(columnId, parseInt(event.dataTransfer.getData('sourceColumnId'), 10), parseInt(event.dataTransfer.getData('cardId'), 10));
    }

    return (
        <div className={className} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleCardDrop}>
            <h2>{name}</h2>
            {cards.map(({ cardContent, cardId }) => {
                return (
                    <Card key={cardId} cardContent={cardContent} cardId={cardId} columnId={columnId} handleClick={moveCardOnClick}
                    />
                )
            })}
        </div>
    );
};

export default Column;
