import React from 'react'
import {
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
import { SIZES, COLORS, FONTS, images } from '../constants'
import Modal from 'react-native-modal'

const SuccessModal = ({
    modalVisible,
    setModalVisible
}: any) => {
    return (
        <Modal
            isVisible={modalVisible}
            hasBackdrop={true}
            backdropOpacity={10}
            backdropColor={'rgba(0, 0, 0, 0.15)'}
            style={{
                marginBottom: 0,
            }}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.viewContainer}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.linkText}>Success</Text>
                        <Image
                            source={images.success2}
                            resizeMode="cover"
                            style={styles.successIcon}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        width: '100%',
    },
    modalContainer: {
        height: 230,
        width: SIZES.width,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        alignItems: 'center',
        paddingHorizontal: 16,
        bottom: 0,
    },
    successIcon: {
        height: 130,
        width: 130,
        marginVertical: 16,
    },
    linkText: {
        ...FONTS.h2,
        color: COLORS.black,
        marginTop: 22,
    },
    subtitle: {
        ...FONTS.h4,
        marginVertical: 16,
        textAlign: 'center',
    },
    btn: {
        width: SIZES.width - 36,
        borderRadius: 36,
        marginVertical: 16,
    },
})
export default SuccessModal
