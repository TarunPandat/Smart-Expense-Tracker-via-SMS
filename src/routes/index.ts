import { HomeScreen } from "../screens/Home"
import { IntroScreen } from "../screens/Intro"
import { Transaction } from "../screens/Transaction"


export const RouteNames = {
    Home: 'Home',
    Intro: 'Intro',
    Transaction: 'Transaction',
}

export const Routes = {
    Intro: {
        name: RouteNames.Intro,
        component: IntroScreen,
        options: {
            headerShown: false,
        },
    },
    Home: {
        name: RouteNames.Home,
        component: HomeScreen,
        options: {
            headerShown: false,
            customHeader: true,
        },
    },
    Transaction: {
        name: RouteNames.Transaction,
        component: Transaction,
        options: {
            headerShown: true,
            customHeader: false,
            backButton: true,
            title: 'All Transactions',
        },
    }
}
