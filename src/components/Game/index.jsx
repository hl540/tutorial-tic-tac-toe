import { useState } from "react";
import Board from "../Board";

export default function Game() {
    // 历史记录
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // 当前所处历史记录
    const [currentMove, setCurrentMove] = useState(0);
    // 当前棋局
    const currentSquares = history[currentMove];
    // 下一个落子状态
    const xIsNext = currentMove % 2 === 0;

    // 处理落子事件
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        // 追加历史记录
        setHistory(nextHistory);
        // 更新当前所处历史记录
        setCurrentMove(nextHistory.length - 1);
    }

    // 跳转到对应的历史记录
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>
                    {
                        history.map((squares, move) => {
                            let description = 'Go to game start';
                            if (move > 0) {
                                description = 'Go to move #' + move;
                            }
                            return (
                                <li key={description}>
                                    <button onClick={() => jumpTo(move)}>{description}</button>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        </div>
    );
}