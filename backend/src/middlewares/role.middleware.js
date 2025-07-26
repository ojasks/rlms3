import { ROLES } from "../constants.js";

export const checkRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user.role;

  // Admin bypass
  if (userRole === ROLES.ADMIN) return next();

  // Group Head form type validation
  if (userRole === ROLES.GROUP_HEAD) {
    const requestedFormType = req.params.formType || req.body.formType;
    if (requestedFormType && requestedFormType != req.user.groupHeadFormType) {
      return res.status(403).json({ 
        error: `Access restricted to form type ${req.user.groupHeadFormType}` 
      });
    }
  }

  // General role check
  if (allowedRoles.includes(userRole)) return next();

  res.status(403).json({ error: "Insufficient permissions" });
};