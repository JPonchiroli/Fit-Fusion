import { StyleSheet, TextInput } from "react-native";

export default function StyledTextInput(props) {

  return (
    <TextInput
      {...props}
      style={styles.nomeTreinoInput}
    />
  );
}

const styles = StyleSheet.create({
  nomeTreinoInput: {
    borderBottomColor: "rgba(255, 57, 83, 1)",
    borderWidth: 2,
    padding: 5,
    color: "#FFF",
    marginLeft: 10,
  },
});
