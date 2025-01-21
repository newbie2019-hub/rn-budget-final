import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

type BottomSheetRef = {
  present: () => void
  close: () => void
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  function SheetModal({ children }, ref) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetModalRef.current?.present(),
      close: () => bottomSheetModalRef.current?.close(),
    }))

    return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            enablePanDownToClose
            enableDynamicSizing
            index={1}
            detached
            snapPoints={['50%']}
            backdropComponent={BottomSheetBackdrop}
          >
            <BottomSheetView style={styles.contentContainer}>
              {children}
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    )
  },
)

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
