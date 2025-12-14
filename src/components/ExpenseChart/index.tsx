import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { formatMoney, mapToChartData } from '../../utils/func';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { Text, useTheme } from 'react-native-paper';
import mainStyles from '../../styles/styles';
import FaIcon from 'react-native-vector-icons/FontAwesome5'

interface ExpensesChartProps {
    expensesData?: any;
}

const ExpensesChart = ({expensesData}: ExpensesChartProps) => {

    const {width} = useWindowDimensions();
    const theme = useTheme()

    const chartConfig: ChartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.1,
        useShadowColorFromDataset: false // optional
    };

    const data = mapToChartData(expensesData) || []
        
    return (
        <View style={mainStyles.row}>
        <PieChart
            data={data}
            width={width - 220}
            height={200}
            chartConfig={chartConfig}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"50"}
            center={[1, 5]}
            absolute
            hasLegend={false}
        />
        <View>
            {data?.map((tx: any) => (
                <View style={[mainStyles.row, mainStyles.alignCenter, {maxWidth: 180}]} key={tx?.color} >
                    <FaIcon name="circle" size={10} color={tx?.color} />
                    <Text variant='labelSmall' style={[{color: tx?.color}, mainStyles.ml1]}>{`${formatMoney(tx?.amount)} - ${tx?.name}`}</Text>
                </View>
            ))}
        </View>
        </View>
    )
}

export default ExpensesChart