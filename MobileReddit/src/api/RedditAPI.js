import axios from 'axios';
import RedditAPI from './Auth';

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

const joinSubreddit = async (subredditName) => {
  const accessToken = await RedditAPI.getAccessToken();
  if (!accessToken) {
    console.log("No acces token available");
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `action=sub&sr_name=${subredditName}`,
  };

  fetch('https://oauth.reddit.com/api/subscribe', requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(`Error joining subreddit: ${data.error}`);
      }
      console.log("Subscribed to subreddit successfully", data);
    })
    .catch(error => {
      console.error(error);
    });
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
