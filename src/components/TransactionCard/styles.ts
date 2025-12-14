import { StyleSheet } from "react-native";
import { Colors } from "../../constants";
import mainStyles from "../../styles/styles";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark,
    marginBottom: 12,
    shadowColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...mainStyles.row,
    ...mainStyles.spaceBetween,
    ...mainStyles.alignCenter,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.white,
  },
  amount: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: 'bold',
  },
}); 

export default styles;