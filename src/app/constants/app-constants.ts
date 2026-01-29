export const APP_CONSTANTS = {
    STORAGE: {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_info',
    THEME: 'app_theme'
  },

  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    USERNAME_MIN_LENGTH: 4,
    TASK_TITLE_MAX_LENGTH: 100,
    COMMENT_MAX_LENGTH: 500
  },

  MASSEGES: {
    LOGIN_FAILED: 'Invalid username or password.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    ERROR_SERVER: 'Server error. Please try again later.',
    ERROR_GENERIC: 'Something went wrong. Please try again later.',
    SUCCESS_TASK_CREATED: 'Task created successfully.',
    SUCCESS_PROJECT_CREATED: 'Project created successfully.'
  },

  PAGGING: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    TASK_PER_PAGE_OPTIONS: [10, 25, 50, 100]
  }
}
