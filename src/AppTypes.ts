export enum Direction {
    LEFT = 'left',
    RIGHT = 'right'
};

export interface CardType {
    cardContent: string,
    cardId: number,
};

export interface ColumnType {
    cards: Array<CardType>,
    name: string,
}
