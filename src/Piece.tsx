/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { Chess, Square as Position } from 'chess.js';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import toPosition, { toTranslation } from './Notation';
import { move } from 'react-native-redash';

const style = StyleSheet.create({
    piece: {
        width: SIZE,
        height: SIZE,
    },
});

type Player = 'b' | 'w';
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Piece = {
    br: require('./assets/br.png'),
    bp: require('./assets/bp.png'),
    bn: require('./assets/bn.png'),
    bb: require('./assets/bb.png'),
    bq: require('./assets/bq.png'),
    bk: require('./assets/bk.png'),
    wr: require('./assets/wr.png'),
    wn: require('./assets/wn.png'),
    wb: require('./assets/wb.png'),
    wq: require('./assets/wq.png'),
    wk: require('./assets/wk.png'),
    wp: require('./assets/wp.png'),
};

interface PieceProps{
    id: Piece,
    startPosition: Vector,
    chess: Chess,
    onTurn: () => void,
    enabled: boolean,
}
const Piece = ({ id, startPosition, chess, onTurn, enabled }: PieceProps) => {
    const isGestureActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offestY = useSharedValue(0);
    const translateX = useSharedValue(startPosition.x * SIZE);
    const translateY = useSharedValue(startPosition.y * SIZE);
    const movePiece = useCallback(
        (to: Position) => {
            const moves = chess.moves({ verbose: true });
            const from = toPosition({ x: offsetX.value, y: offestY.value });
            const move = moves.find((m) => m.from === from && m.to === to);
            const { x, y } = toTranslation(move ? move.to : from);
            translateX.value = withTiming(
                x,
                {},
                () => (offsetX.value = translateX.value)
            );
            translateY.value = withTiming(y, {}, () => {
                offestY.value = translateY.value;
                isGestureActive.value = false;
            });
            if (move) {
                chess.move({ from, to });
                onTurn();
            }
        },
        [chess, isGestureActive, offsetX, offestY, onTurn, translateX, translateY]
    );
}

export default Piece;