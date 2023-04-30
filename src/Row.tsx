
import Cell from './Cell';
import { IBoardSize, IRow } from './types';

interface RowProps {
    row: IRow;
    size: IBoardSize;
}

const Row = ({row, size} : RowProps) => {
        return <div className={`row row-${size}`}> {
            row.map((cell, index) => {
                return <Cell value={cell} size={size} key={index}/>
            })
        } </div>
}

export default Row;