import React from 'react'
import { Text as PText, TextProps, useTheme } from 'react-native-paper'

interface MTextProps extends TextProps<any> {
    color?: string
}


const Text = ({ children, color, ...props }: MTextProps) => {
    const theme: any = useTheme()
    const style = { color: color || theme.colors.white, ...props.style }
    return (
        <PText {...props} style={style} >{children}</PText>
    )
}

export default Text