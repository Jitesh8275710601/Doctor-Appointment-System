import { useState, useEffect, useCallback, useRef } from "react";
import { servicesAPI } from "../services/api";

export const useServices = (initialParams = {}) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({ page: 1, limit: 9, ...initialParams });
  const abortRef = useRef(null);

  const fetchServices = useCallback(async (fetchParams) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    try {
      const res = await servicesAPI.getAll(fetchParams);
      setServices(res.data);
      setPagination(res.pagination);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await servicesAPI.getCategories();
      setCategories([{ _id: "All", count: null }, ...res.data]);
    } catch (_) {}
  }, []);

  useEffect(() => {
    fetchServices(params);
  }, [params, fetchServices]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  return {
    services,
    categories,
    pagination,
    loading,
    error,
    params,
    updateParams,
    setPage,
    refetch: () => fetchServices(params),
  };
};

export const useServiceDetail = (slug) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await servicesAPI.getBySlug(slug);
        setService(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { service, loading, error };
};
