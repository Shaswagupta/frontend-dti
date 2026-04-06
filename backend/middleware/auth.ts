import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

// Extend Express Request to hold the user object
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Extract JWT from request and verify user
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];
  
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Fetch role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  req.user = {
    ...data.user,
    role: profile?.role || 'student'
  };

  next();
};

export const isOrganizer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'organizer') {
    return res.status(403).json({ error: 'Access denied: Organizer role required' });
  }
  next();
};

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({ error: 'Access denied: Student role required' });
  }
  next();
};
