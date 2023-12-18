import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { isNumber } from 'radash';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentSemester, setCurrentSemester] = useState('FA23');
    const [subCriteria, setSubCriteria] = useState<any>();
    const mappedSemesters = semesters?.map((semester) => ({ label: semester.name, value: semester.name }));
    useEffect(() => {
        const fetchCurrentPoint = async () => {
            setLoading(true); // Set loading to true before making the API call
            try {
                const gradeResponse = await get(`/grade/history/semester/${currentSemester}/me`);
                if (gradeResponse.status === 200) {
                    const grade = (gradeResponse.data as any).gradeHistory as any[];
                    const achieve = grade.filter((item) => item.type === 2);
                    const task = grade.filter(item => item.type === 1);
                    const event = grade.filter(item => item.type === 0);
                    setAchievementGrade(achieve);
                    setEventAttendance(event);
                    setTaskGrade(task);
                    setGrade(gradeResponse.data as any);
                    setSubCriteria((gradeResponse.data as any).gradeAllResponse.gradeSubCriteriaResponses)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after API call completes
            }
        };

        fetchCurrentPoint();
    }, [currentSemester]);
    const getCriteriaText = (criteriaId: number) => {
        return (subCriteria as any[])?.find((item) => item.id === criteriaId).content;
    }
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'achievement', title: 'Achievement Grade' },
        { key: 'task', title: 'Task Grade' },
        { key: 'participant', title: 'Participant Grade' },
    ]);

    const [selectedTab, setSelectedTab] = useState('achievement');

    const renderGradeSection = (grades: any, title: string) => {
        let totalScore = 0; // Initialize totalScore variable
        if (loading) {
            return (
                <View style={styles.gradeSection}>
                    <Text style={styles.gradeSectionTitle}>{title}</Text>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            );
        }

        return (
            <View style={styles.gradeSection}>
                <Text style={styles.gradeSectionTitle}>{title}</Text>
                {grades?.map((grade: any, index: any) => {
                    // Update totalScore for each grade
                    totalScore += grade.score;

                    return (
                        <View key={index} style={styles.gradeItem}>
                            <Text>{grade.title}</Text>
                            <Text>Score: {grade.score}</Text>
                            {isNumber(grade.gradeSubCriteriaId) ? <Text>Criteria: {getCriteriaText(grade.gradeSubCriteriaId)}</Text> : null}
                        </View>
                    );
                })}
                {/* Display the total at the end */}
                <View style={[styles.gradeItem, { borderWidth: 0 }]}>
                    <Text style={{ fontWeight: 'bold' }}>Total Score: {totalScore}</Text>
                </View>
            </View>
        );
    }
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
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, selectedTab === 'achievement' && styles.selectedTabButton]}
                        onPress={() => setSelectedTab('achievement')}
                    >
                        <Text>Achievement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, selectedTab === 'task' && styles.selectedTabButton]}
                        onPress={() => setSelectedTab('task')}
                    >
                        <Text>Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, selectedTab === 'participant' && styles.selectedTabButton]}
                        onPress={() => setSelectedTab('participant')}
                    >
                        <Text>Participant</Text>
                    </TouchableOpacity>
                </View>

                {/* Render content based on the selected tab */}
                {selectedTab === 'achievement' && renderGradeSection(achievementGrade, 'Achievement Grade')}
                {selectedTab === 'task' && renderGradeSection(taskGrade, 'Task Grade')}
                {selectedTab === 'participant' && renderGradeSection(eventAttendance, 'Participant Grade')}
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
    }, buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        marginTop: 16
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
    },
    selectedTabButton: {
        backgroundColor: COLORS.gray4,
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
