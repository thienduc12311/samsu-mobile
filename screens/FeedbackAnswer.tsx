import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { isArray, isEmpty, isObject } from 'radash';
import React, { useState } from 'react';
import { Alert, Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox, Rating } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { COLORS, images } from '../constants';
import { post } from '../utils/helpers/api-helper';
interface FeedbackAnswerProps { }
// type: 0 is multiple choice
// type: 1 is single choice
// type: 2 is input answer
// type: 3 rating

function getQuestionType(type: number): string {
    switch (type) {
        case 0:
            return 'multiple_choice';
        case 1:
            return 'single_choice';
        case 2:
            return 'text';
        case 3:
            return 'rating';
        default:
            return 'unknown';
    }

}
const mockQuestion = [
    {
        "id": 2464,
        "type": 0,
        "question": "What do you like about the event?",
        "answer": "Engaging and informative|The opportunity to network|The variety of topics covered|The overall organization and smooth execution",
        "eventId": 118
    },
    {
        "id": 2465,
        "type": 1,
        "question": "Are you satisfied with the event?",
        "answer": "Very satisfied|Satisfied|Ok|Not very satisfied|Unsatisfied",
        "eventId": 118
    },
    {
        "id": 2466,
        "type": 2,
        "question": "How can we improve the event?",
        "answer": "",
        "eventId": 118
    },
    {
        "id": 2466,
        "type": 3,
        "question": "Rate your experience",
        "answer": "",
        "eventId": 118
    }
]
const FeedbackAnswer: React.FC<any> = ({ route }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { feedbackQuestions, eventId } = route.params;
    const [answers, setAnswers] = useState<any[]>([]);
    const [answersSubmit, setAnswersSubmit] = useState<any[]>([]);

    const navigation = useNavigation();
    const questions = feedbackQuestions.map((question: any) => {
        return { question: question.question, type: getQuestionType(question.type), choices: question.answer.split('|'), questionId: question.id }
    })
    const isAnswerValid = (answer: any) => {
        if (answer === undefined || (isArray(answer) && answer.length === 0)) {
            return false;
        }
        return true;
    };

    const handleNext = () => {
        // Save the current answer
        const currentAnswer = getAnswerComponent((questions[currentQuestion] as any).type);
        if (!isAnswerValid(currentAnswer) || !isObject(answersSubmit[currentQuestion]) || isEmpty(answersSubmit[currentQuestion]?.content)) {
            Alert.alert('Please answer the question before proceeding.');
            return;
        }
        // setAnswers([...answers, answerObject]);
        // setAnswers([...answers, currentAnswer]);
        // Move to the next question
        setCurrentQuestion(currentQuestion + 1);
    };
    const handleBack = () => {
        // Move to the previous question
        setCurrentQuestion(currentQuestion - 1);
    };
    const handleSubmitAnswer = async () => {
        try {
            const result = await post(`/feedback/event/${eventId}/submit`, answersSubmit);
            if (result.status === 201) {
                Alert.alert('Successfully submit feedback answer!');
                navigation.goBack();
            } else {
                Alert.alert('Failed submit feedback answer!');
            }
        } catch (error: any) {
            console.error(error.response.data)
            Alert.alert('Failed submit feedback answer!');
        }
    }
    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrowleft"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Feather
                        name="more-horizontal"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    const isQuestionChecked = (answers: string[], choice: string): boolean => {
        if (isArray(answers)) {
            return answers.includes(choice);
        }
        return false;
    }
    const handleRating = (rating: any) => {
        setAnswers([...answers.slice(0, currentQuestion), rating])
        const answerObject = {
            questionId: (questions[currentQuestion] as any).questionId,
            content: rating + "",
        };
        setAnswersSubmit([...answersSubmit.slice(0, currentQuestion), answerObject]);
    }
    const handleTextQuestionSubmit = (text: string) => {
        setAnswers([...answers.slice(0, currentQuestion), text]);
        const answerObject = {
            questionId: (questions[currentQuestion] as any).questionId,
            content: text,
        };
        setAnswersSubmit([...answersSubmit.slice(0, currentQuestion), answerObject])
    }
    const handleSingleChoiceSubmit = (choice: any) => {
        setAnswers([...answers.slice(0, currentQuestion), choice]);
        const answerObject = {
            questionId: (questions[currentQuestion] as any).questionId,
            content: choice,
        };
        setAnswersSubmit([...answersSubmit.slice(0, currentQuestion), answerObject])
    }
    const handleCheckboxPress = (choice: string) => {
        const currentAnswers = isArray(answers[currentQuestion]) ? answers[currentQuestion] : [];
        const updatedAnswers = currentAnswers.includes(choice)
            ? currentAnswers.filter((selectedChoice: string) => selectedChoice !== choice)
            : [...currentAnswers, choice];
        // Join the updated choices into a single string separated by '|'
        const updatedAnswersString = updatedAnswers.join('|');
        const answerObject = {
            questionId: (questions[currentQuestion] as any).questionId,
            content: updatedAnswersString,
        };
        setAnswersSubmit([...answersSubmit.slice(0, currentQuestion), answerObject]);
        setAnswers([...answers.slice(0, currentQuestion), updatedAnswers]);
    };
    const getAnswerComponent = (type: string) => {
        // Based on the question type, return the appropriate answer component
        switch (type) {
            case 'text':
                return (
                    <TextInput
                        placeholder={'Input your answer...'}
                        value={answers[currentQuestion]}
                        multiline
                        onChangeText={handleTextQuestionSubmit}
                        style={{ height: 70, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
                    />
                );
            case 'multiple_choice':
                return (
                    <>
                        {((questions[currentQuestion] as any).choices || []).map((choice: string, index: number) => (
                            <CheckBox
                                key={index}
                                title={choice}
                                checked={isQuestionChecked(answers[currentQuestion], choice)}
                                onPress={() => handleCheckboxPress(choice)}
                            />
                        ))}
                    </>
                );
            case 'single_choice':
                return (
                    <>
                        {((questions[currentQuestion] as any).choices || []).map((choice: string, index: number) => (
                            <RadioButton.Item
                                key={index}
                                color={COLORS.primary}
                                label={choice}
                                value={choice}
                                status={answers[currentQuestion] === choice ? 'checked' : 'unchecked'}
                                onPress={() => handleSingleChoiceSubmit(choice)}
                            />
                        ))}
                    </>
                );
            // case 'single_choice':
            //     return (
            //         <>
            //             {((questions[currentQuestion] as any).choices || []).map((choice: string, index: number) => (
            //                 <CheckBox
            //                     key={index}
            //                     title={choice}
            //                     checked={answers[currentQuestion] === choice}
            //                     onPress={() => handleSingleChoiceSubmit(choice)}
            //                 />
            //             ))}
            //         </>
            //     );
            case 'rating':
                return (
                    <Rating
                        startingValue={answers[currentQuestion] || 0}
                        fractions={2} // Allow half stars
                        onFinishRating={handleRating}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20 }}>
                        <Image
                            source={images.feedback}
                            resizeMode="contain"
                            style={styles.cover}
                        />
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                                {(questions[currentQuestion] as any).question}
                            </Text>
                            {getAnswerComponent((questions[currentQuestion] as any).type)}

                            <View style={{ flexDirection: 'row', justifyContent: currentQuestion === 0 ? 'flex-end' : 'space-between', marginTop: 20 }}>
                                {currentQuestion > 0 && (
                                    <Button title="Back" onPress={handleBack} />
                                )}

                                {currentQuestion < questions.length - 1 && (
                                    <Button title="Next" onPress={handleNext} />
                                )}

                                {currentQuestion === questions.length - 1 && (
                                    <Button title="Submit" onPress={handleSubmitAnswer} />
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    cover: {
        height: 218,
        width: '100%',
        borderRadius: 8,
        marginBottom: 16,
    },
})
export default FeedbackAnswer;
