import React, { useState, useEffect } from "react";
import { View, StyleSheet, Vibration } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { Audio } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";

import { RoundedButton, Countdown, Timing } from "../components";
import { colors } from "../utils";

const minutesToMillis = (min) => min * 1000 * 60;

export const Timer = ({ subject, clearSubject, onTimerEnd }) => {
    useKeepAwake();

    const soundObject = new Audio.Sound();

    const [millis, setMillis] = useState(10000);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);


    useEffect(() => {
        const interval = setInterval(() => {
            if (isStarted) {
                setMillis((time) => {
                    if (time === 0) {
                        clearInterval(interval);
                        onEnd();
                        return time;
                    }
                    setProgress(Math.round(((time - 1000) / millis) * 100) / 100);
                    return time - 1000;
                })
            };
        }, 1000);
        return () => clearInterval(interval);
    }, [isStarted])

    useEffect(() => {
        return async () => {
            await soundObject.unloadAsync();
        };
    }, []);

    const onEnd = async () => {
        try {
            await soundObject.loadAsync(require("../../assets/bell.mp3"));
            await soundObject.playAsync();
            const interval = setInterval(() => Vibration.vibrate(5000), 1000);
            setTimeout(() => {
                clearInterval(interval);
            }, 10000);
        } catch (error) {
            console.log(error);
        }

        setProgress(1);
        setIsStarted(false);
        setMillis(minutesToMillis(20));
        onTimerEnd();
    };

    const changeTime = (min) => () => {
        setProgress(1);
        setIsStarted(false);
        setMillis(minutesToMillis(min));
    };

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    millis={millis}
                />
                <View style={{ padding: 50 }}>
                    <Text style={styles.title}>Focusing on:</Text>
                    <Text style={styles.task}>{subject}</Text>
                </View>
            </View>
            <View>
                <ProgressBar
                    progress={progress}
                    color={colors.lightBlue}
                    style={{ height: 10 }}
                />
            </View>

            <View style={styles.buttonWrapper()}>
                <Timing changeTime={changeTime} />
            </View>

            <View style={styles.buttonWrapper({ flex: 0.3 })}>
                {isStarted ? (
                    <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
                ) : (
                    <RoundedButton title="start" onPress={() => setIsStarted(true)} />
                )}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title="X" size={50} onPress={() => clearSubject()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkBlue,
        flex: 1,
    },
    countdown: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { color: "white", textAlign: "center" },
    task: { color: "white", fontWeight: "bold", textAlign: "center" },
    buttonWrapper: ({
        flex = 0.25,
        padding = 15,
        justifyContent = "center",
    } = {}) => ({
        flex,
        flexDirection: "row",
        alignItems: "center",
        justifyContent,
        padding,
    }),
    clearSubject: {
        paddingBottom: 25,
        paddingLeft: 25,
    },
});
