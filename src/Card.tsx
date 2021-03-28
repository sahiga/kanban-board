import * as React from 'react';
import { Direction } from './AppTypes';

interface CardProps {
    cardContent: string,
    cardId: number,
    columnId: number,
    handleClick: (columnId: number, cardId: number, direction: Direction) => void,
};

const Card = ({ cardId, cardContent, columnId, handleClick }: CardProps) => {
    /**
     * Store the card id and source column id in the drag event's DataTransfer object
     * @param event React.DragEvent
     */
    const handleDragStart = (event: React.DragEvent) => {
        event.dataTransfer.setData('cardId', cardId.toString());
        event.dataTransfer.setData('sourceColumnId', columnId.toString());
    }

    return (
        <div className="Card" onDragStart={handleDragStart} draggable>
            <p>{cardContent}</p>
            {columnId !== 0 && <button className="Card-button" onClick={() => handleClick(columnId, cardId, Direction.LEFT)}>&#x2190;</button>}
            {columnId !== 2 && <button className="Card-button" onClick={() => handleClick(columnId, cardId, Direction.RIGHT)}>&#x2192;</button>}
        </div>
    );
};

export default Card;
