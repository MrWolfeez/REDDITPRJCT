import axios from 'axios';

const redditAxios = axios.create({
  baseURL: 'https://oauth.reddit.com',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

const fetchPopularSubreddits = async () => {
  try {
    const response = await axios.get('https://www.reddit.com/subreddits/popular.json');
    const subreddits = response.data.data.children.map(subreddit => subreddit.data);
    return subreddits;
  } catch (error) {
    console.error('error :', error);
  }
};

const getSubscribedSubreddits = async (accessToken) => {
  try {
    const response = await redditAxios.get('/subreddits/mine/subscriber', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data.children.map(subreddit => subreddit.data);
  } catch (error) {
    console.error('error :', error);
  }
};

const joinSubreddit = async (accessToken, subredditId) => {
  try {
    const response = await redditAxios.post('/api/subscribe', {
      action: 'sub',
      sr: subredditId
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('error :', error);
  }
};

const searchSubreddits = async (accessToken, query) => {
  try {
    const response = await redditAxios.get(`/subreddits/search?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data.children.map(subreddit => subreddit.data);
  } catch (error) {
    console.error('error :', error);
  }
};

export { fetchPopularSubreddits, getSubscribedSubreddits, joinSubreddit, searchSubreddits };
