import Square from "../Square";

// 棋盘组件
export default function Board({ xIsNext, squares, onPlay }) {
    // 棋局输赢状态
    const winner = calculateWinner(squares);
    let status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if (winner) {
        status = 'Winner: ' + winner;
    }

    // 点击格子落子
    function handleClick(i) {
        // 检查是否已经有胜利方,是否覆盖落子
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // 棋盘状态副本，原state不变性原则
        const nextSquares = squares.slice();
        // 交替落子判断
        nextSquares[i] = xIsNext ? 'X' : 'O';
        // 更新棋盘状态
        onPlay(nextSquares)
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    );
}

// 检查胜利
function calculateWinner(squares) {
    // 枚举胜利条件
    const lines = [
        [0, 1, 2],// 第一行连续
        [3, 4, 5],// 第二行连续
        [6, 7, 8],// 第三行连续
        [0, 3, 6],// 第一列连续
        [1, 4, 7],// 第二列连续
        [2, 5, 8],// 第三列连续
        [0, 4, 8],// 左上角到右下角连续
        [2, 4, 6],// 右上角到左下角连续
    ];
    // 检查状态
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // 未落子跳过
        if (!squares[a] || !squares[b] || !squares[c]) {
            continue;
        }
        if (squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

