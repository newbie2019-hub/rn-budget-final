import { Link } from 'expo-router'
import { Text, View } from '@/components/themed'
import { Modal, Pressable } from 'react-native'
import { useState } from 'react'

export default function Index() {
  const [showResetModal, setShowResetModal] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link
        href="/home"
        replace
      >
        <Text>Go to About screen</Text>
        <Pressable onPress={() => setShowResetModal(true)}>
          <Text>Show Modal</Text>
        </Pressable>
      </Link>
      <Modal
        visible={showResetModal}
        animationType="fade"
        transparent
        statusBarTranslucent
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View
            style={{
              width: '80%',
              padding: 20,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          >
            <Text>Reset Data</Text>
            <Text>
              Are you sure you want to reset all your data? This action cannot
              be undone
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 6,
              }}
            >
              <Pressable onPress={() => setShowResetModal(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  /* Add your reset logic here */
                }}
              >
                <Text>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
