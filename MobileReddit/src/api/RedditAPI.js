import axios from 'axios';

const fetchPopularSubreddits = async () => {
  try {
    const response = await axios.get('https://www.reddit.com/subreddits/popular.json');
    const subreddits = response.data.data.children.map(subreddit => subreddit.data);
    return subreddits;
  } catch (error) {
    console.error('error :', error);
  }
};

export { fetchPopularSubreddits };
