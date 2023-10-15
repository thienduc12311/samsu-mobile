import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { illustrations } from '../constants'
import PageContainer from '../components/PageContainer'
import DotsView from '../components/DotsView'
import Button from '../components/Button'
import Onboarding1Styles from '../styles/OnboardingStyles'
import { COLORS } from '../constants'

const Onboarding1 = ({
    navigation
}: any) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(intervalId)
                    return prevProgress
                }
                return prevProgress + 0.3
            })
        }, 2000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if (progress >= 1) {
            // navigate to the Onboarding2 Screen
            navigation.navigate('Onboarding2')
        }
    }, [progress, navigation])

    return (
        <SafeAreaView style={Onboarding1Styles.container}>
            <StatusBar style="light" />
            <PageContainer>
                <View style={Onboarding1Styles.contentContainer}>
                    <Image
                        source={illustrations.illustration1}
                        resizeMode="contain"
                        style={Onboarding1Styles.illustration}
                    />

                    <View style={Onboarding1Styles.titleContainer}>
                        <Text style={Onboarding1Styles.title}>
                            Wanna learn something new
                        </Text>
                    </View>

                    <Text style={Onboarding1Styles.description}>
                        You can try a class program that suits your learning
                        style at LearnConnect. Immediately register yourself!
                    </Text>

                    <View style={Onboarding1Styles.dotsContainer}>
                        {progress < 1 && (
                            <DotsView progress={progress} numDots={4} />
                        )}
                    </View>

                    <View style={Onboarding1Styles.buttonContainer}>
                        <Button
                            title="Next"
                            filled
                            onPress={() => navigation.navigate('Onboarding2')}
                            style={Onboarding1Styles.nextButton}
                        />
                        <Button
                            title="Skip"
                            onPress={() => navigation.navigate('Login')}
                            textColor={COLORS.primary}
                            style={Onboarding1Styles.skipButton}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Onboarding1
