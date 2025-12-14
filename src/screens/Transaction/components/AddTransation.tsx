import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import mainStyles from '../../../styles/styles';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AddTransactionForm from './AddTransactionForm';

interface AddTransationProps {
    isVisible: boolean;
    toggleModal: () => void;
    data?: any
}

const AddTransation = ({isVisible, toggleModal, data}: AddTransationProps) => {

    const {height} = useWindowDimensions();
    const theme: any = useTheme()

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <SafeAreaView style={{ height: height* 0.8, backgroundColor: theme.colors.white, borderRadius: 10, padding: 10 }}>
            <View style={[mainStyles.row, mainStyles.spaceBetween, mainStyles.alignCenter]}>
                <Text variant='titleMedium'>{data?.amount ? 'Edit': 'Add'} Transation</Text>
                <FaIcon name="times" size={20} onPress={toggleModal} />
            </View>
            <AddTransactionForm toggleModal={toggleModal} data={data} />
            </SafeAreaView>
    </Modal>
  )
}

export default AddTransation