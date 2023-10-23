/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/App.tsx',
    './src/components/comments/Comments.tsx',
    './src/components/comments/Comment.tsx',
    './src/components/comments/CommentForm.tsx',
    './src/components/comments/Replies.tsx'
  ],
  theme: {
    extend: {
      screens: {
        'xs' : '325px'
      },
      colors: {
        'moderate-blue' : 'hsl(238, 40%, 52%)',
        'soft-red' : 'hsl(358, 79%, 66%)',
        'light-grayish-blue' : 'hsl(239, 57%, 85%)',
        'pale-red' : 'hsl(357, 100%, 86%)',
        'dark-blue' : 'hsl(212, 24%, 26%)',
        'grayish-blue': 'hsl(211, 10%, 45%)',
        'light-gray': 'hsl(223, 19%, 93%)',
        'vlight-gray': 'hsl(228, 33%, 97%)'
      }
    },
  },
  plugins: [],
}

