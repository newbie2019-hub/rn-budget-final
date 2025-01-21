import { TextInput, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ReactNode } from 'react'
import { SUBTLE_DARK } from '@/constants/Colors'
import { View } from '../themed'

const FormInput = ({
  icon,
  placeholder,
  value,
  onChange,
  clearable,
}: {
  icon?: ReactNode
  placeholder: string
  value: string
  onChange: (text: string) => void
  clearable?: boolean
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        gap: 4,
        borderRadius: 8,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {icon && <View>{icon}</View>}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      </View>
      {clearable && value.trim().length > 0 && (
        <TouchableOpacity onPress={() => onChange('')}>
          <AntDesign
            name="close"
            size={16}
            color={SUBTLE_DARK}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default FormInput
