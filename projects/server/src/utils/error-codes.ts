interface CommonError {
  message: string;
  code: string;
}

export const UNAUTHENTICATED: CommonError = {
  message: 'Not authenticated',
  code: 'UNAUTHENTICATED'
};

export const NO_USER_FOUND: CommonError = {
  message: 'No user found',
  code: 'NO_USER_FOUND'
};

export const UNEXPECTED_ERROR: CommonError = {
  message: 'An unexpected error occurred',
  code: 'UNEXPECTED_ERROR'
};
