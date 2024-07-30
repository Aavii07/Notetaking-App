import React, { useState } from 'react';
import { Text, View, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface ZoomableTextProps {
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
    minFontSize?: number;
    maxFontSize?: number;
    startingFontSize?: number;
}

const ZoomableText: React.FC<ZoomableTextProps> = ({
    children,
    style,
    minFontSize = 14,
    maxFontSize = 48,
    startingFontSize = 24,
}) => {
    const [fontSize, setFontSize] = useState(startingFontSize);

    const handlePinch = (event: PinchGestureHandlerGestureEvent) => {
        const scale = event.nativeEvent.scale;
        const newFontSize = Math.max(minFontSize, Math.min(maxFontSize, startingFontSize * scale));
        setFontSize(newFontSize);
    };

    return (
        <PinchGestureHandler onGestureEvent={handlePinch}>
            <View style={styles.container}>
                <Text style={[styles.text, style, { fontSize }]}>
                    {children}
                </Text>
            </View>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: '#000',
    } as TextStyle,
});

export default ZoomableText;
