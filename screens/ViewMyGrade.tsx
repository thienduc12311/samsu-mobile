import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from "../constants";
import { useAppContext } from '../contexts/AppContext';
import { get } from '../utils/helpers/api-helper';

const ViewMyGrade = () => {
    const navigation = useNavigation();
    const { state, dispatch } = useAppContext();
    const { user, semesters } = state;
    const [isOpen, setIsOpen] = useState(false);
    const [eventAttendance, setEventAttendance] = useState<any>();
    const [grade, setGrade] = useState<any>();
    const [taskGrade, setTaskGrade] = useState<any>();
    const [achievementGrade, setAchievementGrade] = useState<any>();

    const schoolContestGrades = grade?.filter((item: any) => item.type === 1);
    const schoolTaskGrades = grade?.filter((item: any) => item.type === 2);
    const [currentSemester, setCurrentSemester] = useState('FA23');
    const mappedSemesters = semesters?.map((semester) => ({ label: semester.name, value: semester.name }));
    useEffect(() => {

        const fetchCurrentPoint = async () => {
            console.log(`grade/history/semester/${currentSemester}/rollnumber/${user?.rollnumber}`);
            const gradeResponse = await get(`grade/history/semester/${currentSemester}/me`);
            if (gradeResponse.status === 200) {
                const grade = gradeResponse.data as any[];
                setGrade(gradeResponse.data as any);
                setAchievementGrade(grade.filter((item) => item.type === 0));
                setEventAttendance(grade.filter(item => item.type === 1));
                setTaskGrade(grade.filter(item => item.type === 2));
            }
        }
        fetchCurrentPoint();
    }, [currentSemester])
    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'semiBold',
                    color: COLORS.black,
                }}>
                    My Grade
                </Text>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderScoreSummary = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                {/* Basic Information */}
                <View style={styles.infoContainer}>
                    {/* Name and Semester Column */}
                    <View style={styles.textContainer}>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Name:</Text>
                            <Text style={styles.infoValue}>{user?.name}</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>StudentID:</Text>
                            <Text style={styles.infoValue}>{user?.rollnumber}</Text>
                        </View>
                    </View>

                    {/* Attended Event Column */}
                    <View style={styles.textContainer}>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Current semester:</Text>
                            <Text style={styles.infoValue}>FU23</Text>
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Attended event:</Text>
                            <Text style={styles.infoValue}>{user?.attendedEvent}</Text>
                        </View>
                    </View>

                    {user?.score ? (
                        <View style={styles.progressContainer}>
                            <CircularProgress
                                value={user?.score}
                                radius={50}
                                maxValue={100}
                                valueSuffix="%"
                                activeStrokeColor="#4CAF50"
                                inActiveStrokeColor="#ddd"
                            />
                        </View>
                    ) : null}
                </View>

                {/* Circular Progress Indicator */}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {renderHeader()}
                {renderScoreSummary()}
                <DropDownPicker
                    open={isOpen}
                    value={currentSemester}
                    items={mappedSemesters as any}
                    setOpen={setIsOpen}
                    setValue={setCurrentSemester}
                />
                {/* Display School Contest Grades */}
                <View style={styles.gradeSection}>
                    <Text style={styles.gradeSectionTitle}>Achievement: </Text>
                    {achievementGrade?.map((grade: any, index: any) => (
                        <View key={index} style={styles.gradeItem}>
                            <Text>{grade.title}</Text>
                            <Text>Score: {grade.score}</Text>
                        </View>
                    ))}
                </View>

                {/* Display School Task Grades */}
                <View style={styles.gradeSection}>
                    <Text style={styles.gradeSectionTitle}>Task Grades</Text>
                    {taskGrade?.map((grade: any, index: any) => (
                        <View key={index} style={styles.gradeItem}>
                            <Text>{grade.title}</Text>
                            <Text>Score: {grade.score}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.gradeSection}>
                    <Text style={styles.gradeSectionTitle}>Participant Grade</Text>
                    {eventAttendance?.map((grade: any, index: any) => (
                        <View key={index} style={styles.gradeItem}>
                            <Text>{grade.title}</Text>
                            <Text>Score: {grade.score}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        backgroundColor: COLORS.white,
        padding: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    infoTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    textContainer: {
        flex: 1,
    },
    progressContainer: {
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    gradeSection: {
        marginTop: 20,
    },
    gradeSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    gradeItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default ViewMyGrade;
