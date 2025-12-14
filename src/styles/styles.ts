import { StyleSheet, ViewProps, ViewStyle } from "react-native";
import { margin, padding } from "./spacing";

export interface MainStyles {
  row: ViewStyle
  alignCenter: ViewStyle
  justifyCenter: ViewStyle
  justifyEnd: ViewStyle
  flex1: ViewStyle
  spaceBetween: ViewStyle

  // Padding keys from padding()
  [key: string]: ViewStyle // fallback to allow dynamic padding keys
}


const mainStyles = StyleSheet.create<MainStyles>({
    row: {
        flexDirection: 'row',
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    flex3: {
        flex: 3,
    },
    ...padding(),
    ...margin(),
});

export default mainStyles;

