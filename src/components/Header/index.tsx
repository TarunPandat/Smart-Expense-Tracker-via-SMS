import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import mainStyles from '../../styles/styles'
import { Avatar, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import FaIcon from 'react-native-vector-icons/FontAwesome';

interface HeaderProps {
    title: string;
    backButton?: boolean;
    [key: string]: any;
}

const Header = ({ title, backButton, ...options }: HeaderProps) => {

    const theme: any = useTheme();
    const { goBack }: any = useNavigation();

    const HeaderRight = options?.headerRight;

    const titleShow = title || 'Welcome'
    return (
        <View style={[styles.container]}>
            <View style={[mainStyles.row, mainStyles.alignCenter, mainStyles.spaceBetween, mainStyles.flex1]}>
                <View style={[mainStyles.row, mainStyles.alignCenter]}>
                    {backButton ? <FaIcon 
                    name="arrow-left"
                    color={theme.colors.white}
                    size={20}
                    onPress={goBack}
                    /> : <Avatar.Image size={30} source={{ uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y' }} />}
                    <Text style={styles.title}>{titleShow}</Text>
                <View />
                </View>
                <View >
                    {HeaderRight && <HeaderRight />}
                </View>
            </View>
        </View>
    )
}

export default Header