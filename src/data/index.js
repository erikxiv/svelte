import recipes from './Recipe';
import organizations from './Organization';
import newsArticles from './NewsArticle';
import flattened from './flattened.json';

export default [...recipes, ...organizations, ...newsArticles];
export { flattened };
