import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SubredditItem = ({ title, description, onJoinPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="ellipsis-h" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onJoinPress}>
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.voteContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name="arrow-up" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="arrow-down" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="comment-o" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="download" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize : 16,
    },
    description: {
    fontSize: 14,
    color: 'grey',
    },
    actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    voteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    },
    button: {
    marginLeft: 8,
    padding: 8,
    },
    });

export default SubredditItem;
