import { View, Text, Platform, StyleSheet } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import Header from '../components/Header';

interface LayoutProps {
    component: React.ComponentType<any> | any;
    full?: boolean;
    options?: any;
}

const Layout = ({ component, full, options, ...props }: LayoutProps) => {

    const theme: ThemeProp | any = useTheme();

    const Wrapper = full ? View : SafeAreaView;
    const Component = component;

    return (
        <Wrapper style={[{ backgroundColor: theme.colors.dark }, styles.wrapper]}>
            {options?.customHeader && <Header {...options} />}
            <Component {...props} />
        </Wrapper>
    )
}

export default Layout

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 10,
    }
})