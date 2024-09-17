
'use client';

import React, { useEffect } from 'react';
import { PageViews } from '@/app/api/PageViews';

interface Props {
    articleId: string;
  }
  
  const PageViewTracker: React.FC<Props> = ({ articleId }) => {
    useEffect(() => {
      const uniqueId = `${articleId}-${Date.now()}`;
      PageViews(articleId);
    }, [articleId]);
  
    return null;
  };
  
  export default PageViewTracker;
