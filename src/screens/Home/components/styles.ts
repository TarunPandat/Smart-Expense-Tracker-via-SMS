import { StyleSheet } from "react-native";
import mainStyles from "../../../styles/styles";
import { Colors } from "../../../constants";

const styles = StyleSheet.create({
    balanceCard: {
        paddingVertical: 15,
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(253, 253, 253, 0.1)',
        ...mainStyles.row,
    },
    label: {
        fontSize: 10,
        color: Colors.secondary,
        textTransform: 'uppercase',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        marginTop: 5,
    },
    cardWrapper: {
        marginVertical: 10,
        height: 120,
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: 100,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: 15,
        boxShadow: Colors.primary,
    }
})

export default styles;