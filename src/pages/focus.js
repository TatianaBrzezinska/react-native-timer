import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet, Text, Keyboard } from "react-native";

import { RoundedButton, FocusHistory } from "../components";
import { fontSizes, colors } from "../utils";

export const Focus = ({ addSubject, focusHistory, onFocusHistory }) => {
    const [focusItem, setFocusItem] = useState(null);
    return (
        <View style={styles.focusContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>What would you like to focus on?</Text>
                <View style={styles.container}>
                    <TextInput
                        style={{ flex: 1 }}
                        maxLength={50}
                        value={focusItem}
                        onChangeText={(text) => setFocusItem(text)}
                        onSubmitEditing={({ nativeEvent: { text } }) => setFocusItem(text)}
                    />
                    <RoundedButton
                        style={styles.addSubject}
                        size={50}
                        title="+"
                        onPress={() => {
                            Keyboard.dismiss();
                            addSubject(focusItem)
                        }}
                    />
                </View>
            </View>
            <FocusHistory
                focusHistory={focusHistory}
                setFocusHistory={onFocusHistory}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    focusContainer: { flex: 1, backgroundColor: colors.darkBlue },
    container: {
        flexDirection: "row",
    },
    titleContainer: { flex: 0.5, padding: 16, justifyContent: "center" },
    title: {
        color: colors.white,
        fontWeight: "bold",
        padding: 16,
        fontSize: fontSizes.lg,
    },
    addSubject: { marginLeft: 10, alignSelf: "center" },
});
