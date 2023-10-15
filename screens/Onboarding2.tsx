import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { illustrations } from '../constants'
import PageContainer from '../components/PageContainer'
import DotsView from '../components/DotsView'
import Button from '../components/Button'
import Onboarding2Styles from '../styles/OnboardingStyles'
import { COLORS } from '../constants'

const Onboarding2 = ({
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
            // navigate to the Onboarding3 Screen
            navigation.navigate('Onboarding3')
        }
    }, [progress, navigation])

    return (
        <SafeAreaView style={Onboarding2Styles.container}>
            <StatusBar style="light" />
            <PageContainer>
                <View style={Onboarding2Styles.contentContainer}>
                    <Image
                        source={illustrations.illustration2}
                        resizeMode="contain"
                        style={Onboarding2Styles.illustration}
                    />

                    <View style={Onboarding2Styles.titleContainer}>
                        <Text style={Onboarding2Styles.title}>
                            Free learning material
                        </Text>
                    </View>

                    <Text style={Onboarding2Styles.description}>
                        Starting from 23 chapters of reading material to 567
                        minutes of video material, you can enjoy the latest
                        digital topics for free.
                    </Text>

                    <View style={Onboarding2Styles.dotsContainer}>
                        {progress < 1 && (
                            <DotsView progress={progress} numDots={4} />
                        )}
                    </View>

                    <View style={Onboarding2Styles.buttonContainer}>
                        <Button
                            title="Next"
                            filled
                            onPress={() => navigation.navigate('Onboarding3')}
                            style={Onboarding2Styles.nextButton}
                        />
                        <Button
                            title="Skip"
                            onPress={() => navigation.navigate('Login')}
                            textColor={COLORS.primary}
                            style={Onboarding2Styles.skipButton}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Onboarding2
