import { useState, useEffect } from 'react';
import { getCommentsByCompanyId, createComment, deleteComment } from '../../pages/api/api_comment';
import { getBusinessAverageRanking, createRanking } from '@/pages/api/api_ranking';

export const useComments = (companyId) => {
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const commentsData = await getCommentsByCompanyId(companyId);
        setComments(commentsData.data || []);

        const avgData = await getBusinessAverageRanking(companyId);
        setAverageRating(avgData.averageRating || 0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  const addComment = async (userId, comment, rating) => {
    if (!userId || !comment.trim() || !rating) {
      throw new Error('Invalid input for adding a comment.');
    }

    try {
      const rankingData = { userId, businessId: companyId, stars: rating };
      const ratingResponse = await createRanking(rankingData);
      const rankingId = ratingResponse.data._id;

      await createComment(userId, comment, companyId, rankingId);

      const updatedComments = await getCommentsByCompanyId(companyId);
      setComments(updatedComments.data || []);

      const avgData = await getBusinessAverageRanking(companyId);
      setAverageRating(avgData.averageRating || 0);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const delComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId);
      if (response.success) {
        const updatedComments = await getCommentsByCompanyId(companyId);
        setComments(updatedComments.data || []);
      }
      return response;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return { comments, averageRating, loading, addComment, delComment };
};
