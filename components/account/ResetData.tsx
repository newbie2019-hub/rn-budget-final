import { Modal, Pressable } from 'react-native'
import { Text, View } from '../themed'

const ResetDataModal = ({
  visible,
  onCancel,
  ...rest
}: {
  visible: boolean
  onCancel: () => void
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'trasparent',
      }}
    >
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        statusBarTranslucent
        style={{ backgroundColor: 'red', flex: 1 }}
      >
        <View style={{ backgroundColor: 'white' }}>
          <Text>Reset Data</Text>
          <Text>
            Are you sure you want to reset all your data? This action cannot be
            undone
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 6 }}
          >
            <Pressable onPress={onCancel}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable>
              <Text>Delete Data</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ResetDataModal
