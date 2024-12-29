import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from './Spacing'

interface ScrollableLayoutProps {
    children: any,
    title: string,
    bottomSpace?: number
}

const ScrollableLayout = (props: ScrollableLayoutProps) => {
  return (
    <View style={styles.fullView}>
        <SafeAreaView style={styles.safeView}>
            <View style={styles.customHeader}>
                    <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.contentView}>
                
                
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                        {props.children}
                        <Spacing marginTop={props.bottomSpace ? props.bottomSpace : 4} >

                        </Spacing>
                </ScrollView>
            </View>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollView: {
        flex: 1,
        paddingTop: 4,
        paddingBottom: 40
    },
    fullView: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentView: {
        flex: 1,
        marginHorizontal: 10,
    },
    titleText: {
        fontSize: 26,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    customHeader: {
        backgroundColor: 'white',
        borderColor: 'none',
        borderBottomColor: 'rgba(150, 150, 150, 0.34)',
        borderBottomWidth: 1,
    },
})

export default ScrollableLayout