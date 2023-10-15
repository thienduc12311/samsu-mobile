import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { illustrations } from '../constants'
import PageContainer from '../components/PageContainer'
import DotsView from '../components/DotsView'
import Button from '../components/Button'
import Onboarding3Styles from '../styles/OnboardingStyles'
import { COLORS } from '../constants'

const Onboarding3 = ({
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
            // navigate to the Signup Screen
            navigation.navigate('Register')
        }
    }, [progress, navigation])

    return (
        <SafeAreaView style={Onboarding3Styles.container}>
            <StatusBar style="light" />
            <PageContainer>
                <View style={Onboarding3Styles.contentContainer}>
                    <Image
                        source={illustrations.illustration3}
                        resizeMode="contain"
                        style={Onboarding3Styles.illustration}
                    />

                    <View style={Onboarding3Styles.titleContainer}>
                        <Text style={Onboarding3Styles.title}>
                            The material curriculum is designed by experts in
                            their fields
                        </Text>
                    </View>

                    <Text style={Onboarding3Styles.description}>
                        Learning materials on LearnConnect are designed by
                        startup experts.
                    </Text>

                    <View style={Onboarding3Styles.dotsContainer}>
                        {progress < 1 && (
                            <DotsView progress={progress} numDots={4} />
                        )}
                    </View>

                    <View style={Onboarding3Styles.buttonContainer}>
                        <Button
                            title="Next"
                            filled
                            onPress={() => navigation.navigate('Register')}
                            style={Onboarding3Styles.nextButton}
                        />
                        <Button
                            title="Skip"
                            onPress={() => navigation.navigate('Register')}
                            textColor={COLORS.primary}
                            style={Onboarding3Styles.skipButton}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Onboarding3
