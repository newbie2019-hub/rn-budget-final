import { Text, View } from '@/components/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { FONT_SIZE } from '@/constants/styling'
import LottieView from 'lottie-react-native'

const About = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 5,
          backgroundColor: 'gray',
          width: 40,
          borderRadius: 20,
          marginTop: 10,
          marginHorizontal: 'auto',
        }}
      ></View>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <View style={{ marginHorizontal: 'auto', marginVertical: 20 }}>
            <LottieView
              source={require('../../assets/images/icons/hand-wave.json')}
              style={{ height: 120, width: 120 }}
              autoPlay
              loop
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: FONT_SIZE.HEADING,
                marginTop: 4,
              }}
            >
              Kaperas
            </Text>
          </View>
          <View style={{ gap: 16, marginTop: 12 }}>
            <Text style={{ textAlign: 'justify', lineHeight: 22 }}>
              Hi, I'm Yvan a full stack web developer. This project allowed me
              to dive into mobile development and explore technologies like
              React Native, Expo, Drizzle, and Expo SQLite, all while building
              something practical for my own use.
            </Text>
            <Text style={{ textAlign: 'justify', lineHeight: 22 }}>
              The process of building Kaperas was both challenging and rewarding
              as it gave me the opportunity to learn, grow, and push my limits
              as a developer.
            </Text>
            <Text style={{ textAlign: 'justify', lineHeight: 22 }}>
              I’d love to connect with like-minded individuals and share ideas,
              whether you’re a developer, designer, or someone with a great
              idea. I’d be thrilled to connect and collaborate. Let’s build
              something amazing together!
            </Text>
          </View>
          <Text style={{ marginTop: 30 }}>Resources</Text>
          <View style={{ marginTop: 8, gap: 4 }}>
            <Text>LottieFiles - Wallet</Text>
            <Text>Google Fonts - Animated Emojis</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default About
