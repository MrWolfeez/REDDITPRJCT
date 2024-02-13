import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import SubredditItem from '../components/SubredditItem';
import { joinSubreddit } from '../api/RedditAPI';
import { fetchPopularSubreddits } from '../api/RedditAPI';

const SubredditListScreen = () => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const loadSubreddits = async () => {
      const fetchedSubreddits = await fetchPopularSubreddits();
      setSubreddits(fetchedSubreddits);
    };

    loadSubreddits();
  }, []);

  const handleJoinPress = async (subredditName) => {
    try {
      const result = await joinSubreddit(subredditName);
      console.log(result);
    } catch (error) {
      console.error('Error joining subreddit:', error);
    }
  };

  return (
    <View>
      <FlatList
        data={subreddits}
        renderItem={({ item }) => (
          <SubredditItem
            titre={item.title}
            description={item.public_description}
            onJoinPress={() => handleJoinPress(item)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SubredditListScreen;
