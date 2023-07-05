/* eslint-disable prettier/prettier */
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import Background from './Background';
import { Chess } from 'chess.js';
import Piece from './Piece';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width,
        height: width,
    },
});

const useConst = <T,>(initialValue: T | (() => T)): T => {
    const ref = useRef<{ value: T }>();
    if (ref.current === undefined) {
        //put the value in an object so we can tell if it's initialized even
        //if the initializer returns or is undefined.
        ref.current = {
            value: 
            typeof initialValue === "function" ? (initialValue as Function)() : initialValue,
        }
    }
    return ref.current.value;
}

const Board = () => {

    const chess = useConst(() => new Chess());
    const [state, setState] = useState({
        player: 'w',
        board: chess.board(),
    })
    return (
        <View style={styles.container}>
            <Background />
            {
                state.board.map((row, i) => row.map(square => {
                    if (square == null) {
                        return null;
                    }
                    return <Piece/>
                }))
            }
        </View>
    );
};

export default Board