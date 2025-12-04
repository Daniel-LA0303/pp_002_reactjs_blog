import { useParams } from 'react-router-dom';
import BlogsByCategory from './BlogsByCategory';

const WrappedBlogsByCategory = () => {
  const { nameCategory } = useParams<{ nameCategory: string }>();
  return <BlogsByCategory key={nameCategory} />;
};

export default WrappedBlogsByCategory;
