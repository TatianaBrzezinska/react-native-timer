import React from "react";
import { Text, StyleSheet } from "react-native";
import { fontSizes, paddingSizes, colors } from "../utils";


const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
    millis
}) => {

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;
    return (
        <Text style={styles.text}>
            {formatTime(minute)}:{formatTime(seconds)}
        </Text>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        fontWeight: "bold",
        color: colors.white,
        padding: paddingSizes.lg,
        backgroundColor: "rgba(94, 132, 226, 0.3)",
    },
});
