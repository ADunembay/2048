import { IBoardSize } from "./types";

interface CellProps {
    value: number;
    size: IBoardSize;
}

const Cell = ({value, size} : CellProps) => {
    if (value === 0){
        return <div className={`cell cell-${size} cell-value-empty`}  />
    }
    const cellValueClassName = value <= 2048 ? `cell-value-${value}` : 'cell-value-big';
    return <div className={`cell cell-${size} ${cellValueClassName}`}> {value} </div>
}

export default Cell;