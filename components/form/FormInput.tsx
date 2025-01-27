import { ColorValue, TextInput, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ReactNode } from 'react'
import { SUBTLE_DARK } from '@/constants/Colors'
import { View } from '../themed'
import { FONT_SIZE } from '@/constants/styling'
import { useThemeColor } from '@/hooks/useThemeColor'

const FormInput = ({
  icon,
  placeholder,
  value,
  onChange,
  clearable,
  backgroundColor,
}: {
  icon?: ReactNode
  placeholder: string
  value: string
  onChange: (text: string) => void
  clearable?: boolean
  backgroundColor?: ColorValue
}) => {
  const color = useThemeColor({}, 'text')
  const secondaryBackground = useThemeColor({}, 'secondaryBackground')

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 12,
        gap: 4,
        borderRadius: 8,
        justifyContent: 'space-between',
        backgroundColor: backgroundColor ?? secondaryBackground,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 6,
          backgroundColor: backgroundColor ?? secondaryBackground,
        }}
      >
        {icon && (
          <View
            style={{ backgroundColor: backgroundColor ?? secondaryBackground }}
          >
            {icon}
          </View>
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          style={{ fontSize: FONT_SIZE.PARAGRAPH, color: color, width: '90%' }}
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
