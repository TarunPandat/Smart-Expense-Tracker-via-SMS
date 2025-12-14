import { View, Text } from 'react-native'
import React from 'react'
import mainStyles from '../../styles/styles';
import { useTheme } from 'react-native-paper';

interface HeaderRightProps {
    onPress?: () => void;
    Icon: any,
    iconName: string,
}

const HeaderRight = ({ onPress, Icon, iconName }: HeaderRightProps) => {

    const theme: any = useTheme()

    return (
        <View style={[mainStyles.alignCenter, mainStyles.row, mainStyles.mr2]} >
            {Icon && <Icon color={theme.colors.white} size={20} name={iconName} onPress={onPress} />}
        </View>
    )
}

export default HeaderRight