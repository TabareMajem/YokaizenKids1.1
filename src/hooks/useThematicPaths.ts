import { useState } from 'react';
import { api } from '../lib/api';
import type { ThematicPath, Milestone } from '../types/thematicPath';

export function useThematicPaths() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaths = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.get('/api/admin/paths');
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch paths';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPath = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.get(`/api/admin/paths/${id}`);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const createPath = async (pathData: Partial<ThematicPath>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post('/api/admin/paths', pathData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePath = async (id: string, pathData: Partial<ThematicPath>) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.put(`/api/admin/paths/${id}`, pathData);
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePath = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await api.delete(`/api/admin/paths/${id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete path';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMilestonePosition = async (
    pathId: string,
    milestoneId: string,
    position: { x: number; y: number }
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.put(
        `/api/admin/paths/${pathId}/milestones/${milestoneId}/position`,
        { position }
      );
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update milestone position';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPaths,
    getPath,
    createPath,
    updatePath,
    deletePath,
    updateMilestonePosition,
    isLoading,
    error
  };
}